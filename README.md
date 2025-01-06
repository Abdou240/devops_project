#  CI/CD PipeLine with Terraform and AWS 

![image](https://github.com/user-attachments/assets/2d631ab2-a9cb-4372-bbe0-69d48312d480)

## Technologies:
- Terraform
- Github Actions
- Docker
- Node.js
- AWS EC2
- AWS S3
- AWS ECR


## Tasks:

- Get access id, secret id from AWS
- Develop a simple nodejs app that serves as part of my portfolio
 ![Capture d'écran 2025-01-06 141305](https://github.com/user-attachments/assets/ba0eae5b-f75e-435d-b2af-fa07d6cddcd2)


- Write Dockerfile for Simple Application
```Dockerfile
FROM node:22
WORKDIR /user/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","start"]
```

- Generate SSH keys for connecting to EC2 instance
- ![Capture d'écran 2025-01-04 161441](https://github.com/user-attachments/assets/4617c86e-0d62-4a52-b7a2-14c29ab2e385)

- Create a S3 bucket for storing Terraform State file
![image](https://github.com/user-attachments/assets/3f201d28-2ca7-4de0-8004-3ccd436dfda8)

- Write Terraform Scripts for provisioning EC2 instance
![image](https://github.com/user-attachments/assets/d4819a1d-55ec-4322-8c6c-03560c92655c)

## Write CI/CD pipeline

- Write Github Actions workflow: Set environment variables

```yml
env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  TF_STATE_BUCKET_NAME: ${{ secrets.AWS_TF_STATE_BUCKET_NAME }}
  PRIVATE_SSH_KEY: ${{ secrets.AWS_SSH_KEY_PRIVATE }}
  PUBLIC_SSH_KEY: ${{ secrets.AWS_SSH_KEY_PUBLIC }}
  AWS_REGION: eu-north-1
```
- Setup backend for S3 bucket with terraform init

```yml
    - name: checkout repo
      uses: actions/checkout@v2
    - name: setup terraform
      uses: hashicorp/setup-terraform@v1
      with:
        terraform_wrapper: false
    - name: Terraform Init
      id: init
      run: terraform init -backend-config="bucket=$TF_STATE_BUCKET_NAME" -backend-config="region=eu-north-1"
      working-directory: ./terraform
```

- Pass tf variables with Terraform plan

```yml
- name: Terraform Plan
  id: plan
  run: |-
    terraform plan -destroy \
    -var="region=eu-north-1" \
    -var="bucket=$TF_STATE_BUCKET_NAME" \
    -var="public_key=$PUBLIC_SSH_KEY" \
    -var="private_key=$PRIVATE_SSH_KEY" \
    -var="key_name=deployer-key" \
    -out=PLAN
  working-directory: ./terraform
```

- Run terraform apply

```yml
- name: Terraform Apply
    id: apply
    run: |-
      terraform apply PLAN
    working-directory: ./terraform
```

- Set EC2 instance public ip as job output

```yml
- name: Set output
    id: set-dns
    run: |-
        echo "::set-output name=instance_public_dns::$(terraform output instance_public_ip)"
    working-directory: ./terraform
```

- Authenticate ECR
```yml
- name: Login to AWS ECR
  id: login-ecr
  uses: aws-actions/amazon-ecr-login@v1
```

- Set ec2 public ip as environment variable for later use

```yml
- run: echo SERVER_PUBLIC_IP=${{ needs.deploy-infra.outputs.SERVER_PUBLIC_DNS }} >> $GITHUB_ENV
```

- Build, tag and push docker image to Amazon ECR

```yml
- name: Build, tag, and push docker image to Amazon ECR
    env:
      REGISTRY: ${{ steps.login-ecr.outputs.registry }}
      REPOSITORY: example-node-app
      IMAGE_TAG: ${{ github.sha }}
    run: |
      docker build -t $REGISTRY/$REPOSITORY:$IMAGE_TAG .
      docker push $REGISTRY/$REPOSITORY:$IMAGE_TAG
    working-directory: ./nodeapp
```

- Connect to EC2 using ssh and deploy docker container

```yml
- name: Deploy Docker Image to EC2
  env:
    REGISTRY: ${{ steps.login-ecr.outputs.registry }}
    REPOSITORY: example-node-app
    IMAGE_TAG: ${{ github.sha }}
    AWS_DEFAULT_REGION: eu-north-1
  uses: appleboy/ssh-action@master
  with:
    host: ${{ env.SERVER_PUBLIC_IP }}
    username: ubuntu
    key: ${{ env.PRIVATE_SSH_KEY }}
    envs: PRIVATE_SSH_KEY,REGISTRY,REPOSITORY,IMAGE_TAG,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_REGION
    script: |-
      sudo apt update
      sudo apt install docker.io -y
      sudo apt install awscli -y
      sudo $(aws ecr get-login --no-include-email --region eu-north-1);
      sudo docker stop myappcontainer || true
      sudo docker rm myappcontainer || true
      sudo docker pull $REGISTRY/$REPOSITORY:$IMAGE_TAG
      sudo docker run -d --name myappcontainer -p 80:8080 $REGISTRY/$REPOSITORY:$IMAGE_TAG
```
