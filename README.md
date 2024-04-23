## Asgard

This is vijiPay's core API service.

#### Setup
- Ensure you have docker installed
- Run `yarn up:dev`

#### Running Tests
- Run `yarn test:run`

AWS Configuration
The Compute option when creating a cluster is
    - Launch Type: Fargate
    - Application Type: Service
    - Enter container configuration
    - Application Load Balancer
- Target Group
- VCS
- ECS Service should have a security group that has public access and has as many public ports open.
