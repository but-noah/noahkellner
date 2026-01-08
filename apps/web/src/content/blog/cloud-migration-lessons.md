---
title: "5 Hard Lessons from Our AWS Cloud Migration"
description: "What we learned migrating Dialog Factory's entire infrastructure to AWS—the wins, the failures, and what I'd do differently."
publishedAt: 2025-01-02
tags: ["AWS", "Infrastructure", "DevOps", "Cloud Migration"]
coverImage: ""
draft: false
---

Migrating an entire company's infrastructure to the cloud sounds straightforward on paper. In practice, it's a journey filled with unexpected challenges, late nights, and hard-won lessons. Here's what we learned moving Dialog Factory to AWS.

## The Starting Point

Before migration, our setup was typical for a growing company:

- On-premise servers in a colocation facility
- Manual deployments via SSH
- Backups that "probably" worked
- Monitoring that consisted of "checking if things are slow"

Sound familiar?

## Lesson 1: Lift-and-Shift Is a Trap

Our initial plan was simple: take our existing VMs and move them to EC2. What could go wrong?

**Everything.**

Lift-and-shift preserves all your existing technical debt while adding cloud complexity. We ended up with:

- Oversized instances (because we didn't understand the workload)
- No auto-scaling (because the apps weren't designed for it)
- Higher costs than on-premise (oops)

**What we should have done:** Treat migration as an opportunity to re-architect. We eventually did this, but it would have been faster to do it right from the start.

## Lesson 2: Infrastructure as Code from Day One

In the beginning, we clicked around the AWS console like it was a video game. Creating resources manually felt fast and intuitive.

Six months later:

- Nobody knew what half the resources were for
- We couldn't reproduce our production environment
- One wrong click deleted a critical security group

**The fix:** We adopted Terraform and never looked back.

```hcl
# Example: Our production VPC setup
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "production-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-central-1a", "eu-central-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
```

Now every change is reviewed, versioned, and reproducible.

## Lesson 3: Cost Management Is a Full-Time Job

Our first AWS bill was a shock. We had no idea that:

- Data transfer costs add up fast
- Unused EBS volumes cost money
- That "small" test environment someone forgot about costs €500/month

**What helped:**

1. **AWS Cost Explorer** with daily budget alerts
2. **Spot instances** for non-critical workloads (70% savings)
3. **Reserved instances** for predictable workloads
4. **Regular cleanup** of unused resources

We reduced our monthly AWS bill by 50% without removing any functionality.

## Lesson 4: Security Is Everyone's Responsibility

The cloud shared responsibility model confused us initially. AWS secures *the* cloud, but we're responsible for security *in* the cloud.

Our initial security posture was embarrassing:

- S3 buckets with public access
- IAM users with admin permissions "because it's easier"
- Security groups that allowed all traffic

**Our current approach:**

- Principle of least privilege everywhere
- AWS Organizations with SCPs
- GuardDuty and Security Hub enabled
- Regular security audits
- No IAM users—SSO only

## Lesson 5: Observability Before You Need It

We waited until our first major outage to invest in monitoring. That's backwards.

**The incident:** Database connection pool exhaustion caused cascading failures. We had no visibility into the problem until users complained.

**What we built:**

```yaml
# Our observability stack
monitoring:
  metrics: CloudWatch + Prometheus
  logging: CloudWatch Logs + OpenSearch
  tracing: AWS X-Ray
  alerting: PagerDuty integration
  dashboards: Grafana
```

Now we see problems before users do. Most issues are resolved before anyone notices.

## The Results

After 18 months of migration and optimization:

| Metric | Before | After |
|--------|--------|-------|
| Deployment frequency | Monthly | Daily |
| Mean time to recovery | Hours | Minutes |
| Infrastructure costs | Higher | 50% lower |
| Security incidents | "Unknown" | Zero critical |
| Developer productivity | Baseline | 3x improvement |

## What I'd Do Differently

If I could restart the migration today:

1. **Containerize first** - We should have moved to Docker/Kubernetes before migrating, not after
2. **Multi-account strategy from day one** - Separating production, staging, and development would have prevented so many accidents
3. **Invest in training early** - AWS certifications for the team would have saved countless hours of trial and error
4. **Start with managed services** - RDS, ElastiCache, etc. are worth the premium for reduced operational burden

## Final Thoughts

Cloud migration isn't a project—it's a transformation. The technology is the easy part. The hard part is changing how your organization thinks about infrastructure.

If you're planning a migration, my advice: take your time, invest in training, and embrace the opportunity to do things right rather than just doing them faster.

---

*Planning a cloud migration? I'd be happy to share more details about our journey. [Get in touch](/contact).*
