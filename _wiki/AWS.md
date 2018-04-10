---
layout  : wiki
title   : AWS
summary : AWS
date    : 2018-04-09 14:14:27 +0900
updated : 2018-04-09 15:23:28 +0900
tags    : aws
toc     : true
public  : true
parent  : DevOps
latex   : false
---
* TOC
{:toc}

## 개요
[ 👉 AWS](https://aws.amazon.com/?nc2=h_lg){:target="_blank"} <br />
[ 👉 AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/reference/){:target="_blank"}

Client의 수 증가에 따른 Infra 구조 변경 확인
* [Ver1](https://www.slideshare.net/YoungJinLee/aws-seaws){:target="_blank"}
* [Ver2](https://www.slideshare.net/YoungJinLee/awscommunityday-2017-5){:target="_blank"}

3만
--

VPC + Public ELB
-	MYSQL
-	[VPC](https://aws.amazon.com/ko/documentation/vpc/)
	- 	Amazon Virtual Private Cloud(Amazon VPC)는 Amazon Web Services(AWS) 리소스를 고객이 정의한 가상 네트워크에서 실행할 수 있는 서비스입니다. 이 가상 네트워크는 AWS의 확장 가능한 인프라를 사용한다는 이점과 함께 고객의 자체 데이터 센터에서 운영하는 기존 네트워크와 매우 유사합니다.
-	[Public ELB](https://docs.aws.amazon.com/ko_kr/elasticloadbalancing/latest/classic/elb-manage-subnets.html)
	- 	VPC에서 클래식 로드 밸런서에 대한 서브넷을 추가 또는 제거 참고

15만
---

VPC + Public ELB <br />
**`+` DB Replication + Jira/Wiki/CMS + Jenkins + Memcached + RabbitMQ** <br />
**`+` CloudWatch** <br />

-	MYSQL Master + Slave
- 	[CloudWatch](https://aws.amazon.com/ko/cloudwatch/)
	-	Amazon CloudWatch는 AWS 클라우드 리소스와 AWS에서 실행되는 애플리케이션을 위한 모니터링 서비스입니다. Amazon CloudWatch를 사용하여 지표를 수집 및 추적하고, 로그 파일을 수집 및 모니터링하며, 경보를 설정하고, AWS 리소스 변경에 자동으로 대응할 수 있습니다. Amazon CloudWatch는 Amazon EC2 인스턴스, Amazon DynamoDB 테이블, Amazon RDS DB 인스턴스 같은 AWS 리소스뿐만 아니라 애플리케이션과 서비스에서 생성된 사용자 정의 지표 및 애플리케이션에서 생성된 모든 로그 파일을 모니터링할 수 있습니다. Amazon CloudWatch를 사용하여 시스템 전반의 리소스 사용률, 애플리케이션 성능, 운영 상태를 파악할 수 있습니다. 이러한 통찰력을 사용하여 문제에 적절히 대응하고 애플리케이션 실행을 원활하게 유지할 수 있습니다. 
- 	[Memcached](https://github.com/memcached/memcached) 
	- 	메모리 캐싱 시스템 <br/>
![With Memcached](https://memcached.org/memcached-usage.png)
 <br/> <br/>
- 	[Rabbit MQ](https://www.rabbitmq.com/)
- 	[Jira](https://ko.atlassian.com/software/jira)
- 	[Wiki](https://www.mediawiki.org/wiki/MediaWiki)
- 	CMS
- 	[Jenkins](https://jenkins.io/)
	- 	로컬빌드 후 패키지 EC2에 복사하고 실행을 대신 해줌

100만
----

VPC + Public ELB <br />
`+` DB Replication + Jira/Wiki/CMS + Jenkins + Memcached + RabbitMQ<br />
`+` CloudWatch<br />
**`+` Auto Scaling + AWS RDS, DMS, SQS, ElastiCache**<br />
**`+` ELK (Elastic Search + Log Stash + Kibana)**<br />

-	[`Auto Scaling`](https://aws.amazon.com/ko/about-aws/whats-new/2018/01/introducing-aws-auto-scaling/) Group 추가
	-	AWS Auto Scaling은 애플리케이션을 모니터링하고 용량을 자동으로 조정하여, 최저 가격으로 안정적이고 예측 가능한 성능을 유지합니다. AWS Auto Scaling을 사용하면 몇 분 안에 여러 서비스에 걸쳐 여러 리소스에 대해 조정을 설정할 수 있습니다. AWS Auto Scaling은 단순하면서도 강력한 사용자 인터페이스를 제공합니다. 그러한 사용자 인터페이스를 통해 Amazon EC2 인스턴스와 스팟 플릿, Amazon ECS 작업, Amazon DynamoDB 테이블 및 Amazon Aurora 복제본에 대해 조정 계획을 수립할 수 있습니다.   
-	MySQL 관리 불가 
	-	[`AWS RDS`](https://aws.amazon.com/ko/rds/)로 이관, [`AWS DMS`](https://aws.amazon.com/ko/dms/)를 이용한 마이그레이션
	- 	[ELK](https://www.elastic.co/kr/elk-stack) 구성
-	AWS 최대한 활용하여 관리 부담 최소화
	- 	RabbitMQ를 [`AWS SQS`](https://aws.amazon.com/ko/sqs/)로 변경
	- 	Memcached를 [`AWS ElastiCache`](https://aws.amazon.com/ko/elasticache/)로 변경

1000만
-----

VPC + Public ELB <br />
`+` DB Replication + Jira/Wiki/CMS + Jenkins + Memcached + RabbitMQ<br />
`+` CloudWatch<br />
`+` Auto Scaling + AWS RDS, DMS, SQS, ElastiCache <br />
`+` ELK (Elastic Search + Log Stash + Kibana)<br />
**`+` AWS EMR Spark, Kinesis, Redis**<br />
**`+` Zeppelin**<br />
**`+` AWS Certificate Manager(ACM)**<br />
**`+` Private Subnet, NAT Gateway**<br />

- [`AWS EMR`](https://aws.amazon.com/ko/emr/details/)
	- Amazon EMR을 사용하면 필요한 용량을 신속하고 손쉽게 프로비저닝할 수 있고 자동이나 수동으로 용량을 추가 및 제거할 수 있습니다. 따라서 처리 요구 사항이 일정하지 않거나 예측 불가능한 경우에 매우 유용합니다. 예를 들어, 야간에 대용량의 처리 작업이 발생할 경우 주간에 100개의 인스턴스가 필요하고 야간에 500개의 인스턴스가 필요할 수 있습니다. 또는 단기간 상당한 용량이 필요할 수도 있습니다. Amazon EMR을 사용하면 신속하게 수백 개 또는 수천 개의 인스턴스를 프로비저닝하고, 컴퓨팅 요구 사항에 맞춰 자동으로 확장하며, 유휴 용량에 대한 비용이 더 이상 청구되지 않도록 작업 완료 시 클러스터를 종료할 수 있습니다.
	- [`Spark`](https://docs.aws.amazon.com/ko_kr/emr/latest/ReleaseGuide/emr-spark.html) 
- [`AWS Kinesis`](https://aws.amazon.com/ko/kinesis/)
	- Amazon Kinesis를 사용하면 실시간 스트리밍 데이터를 손쉽게 수집, 처리 및 분석할 수 있으므로 적시에 통찰력을 확보하고 새로운 정보에 신속하게 대응할 수 있습니다. Amazon Kinesis는 모든 규모의 스트리밍 데이터를 비용 효율적으로 처리할 수 있는 핵심 기능과 더불어 애플리케이션 요구 사항에 가장 적합한 도구를 선택할 수 있는 유연성을 제공합니다. Amazon Kinesis에서는 기계 학습, 분석 및 기타 애플리케이션을 위해 비디오, 오디오, 애플리케이션 로그, 웹 사이트 클릭스트림 및 IoT 텔레메트리 데이터와 같은 실시간 데이터를 수집할 수 있습니다. Amazon Kinesis를 사용하면 모든 데이터가 수집된 후에야 처리를 시작할 수 있는 것이 아니라 데이터가 수신되는 대로 처리 및 분석하여 즉시 대응할 수 있습니다.
- [`AWS ElastiCache for Redis`](https://aws.amazon.com/ko/elasticache/redis/) 
	- Redis용 Amazon ElastiCache는 인터넷 규모의 실시간 애플리케이션을 지원할 수 있도록 1밀리초 미만의 지연 시간을 제공하는 놀랍도록 빠른 인 메모리 데이터 스토어입니다. 오픈 소스 Redis를 기반으로 구축되고 Redis API와 호환되는 Redis용 ElastiCache는 Redis 클라이언트와 연동되며 개방형 Redis 데이터 형식을 사용하여 데이터를 저장합니다. 자가 관리형 Redis 애플리케이션은 코드 변경 없이 Redis용 ElastiCache과 원활하게 연동될 수 있습니다. Redis용 ElastiCache는 오픈 소스 Redis의 속도, 간편성 및 다양성과 Amazon의 관리 편의성, 보안 및 확장성을 결합하여 게임, 광고 기술, 전자 상거래, 의료 서비스, 금융 서비스 및 IoT 분야에서 가장 까다로운 실시간 애플리케이션을 지원합니다. 
- [`AWS Certificate Manager(ACM)`](https://docs.aws.amazon.com/ko_kr/acm/latest/userguide/acm-overview.html)
	- AWS Certificate Manager(ACM)는 AWS 기반 웹 사이트 및 애플리케이션에 대한 SSL/TLS 인증서를 생성 및 관리하는 복잡한 과정을 처리합니다. ACM에서 제공하는 인증서(ACM 인증서) 또는 ACM으로 가져온 인증서를 사용할 수 있습니다. ACM 인증서는 도메인 이름과 도메인 내 여러 이름을 보호할 수 있습니다. 또한 ACM을 사용하여 원하는 만큼의 하위 도메인을 보호할 수 있는 와일드카드 SSL 인증서를 생성할 수도 있습니다.
- [`Private Subnet`](https://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/VPC_Scenario2.html)
- [`NAT Gateway`](https://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html)
- [`Zeppelin`](https://zeppelin.apache.org/)

2000만
-----

VPC + Public ELB + DB Replication  <br />
`+` Jira/Wiki/CMS + Jenkins + Memcached + RabbitMQ <br />
`+` CloudWatch <br />
`+` Auto Scaling + AWS RDS, DMS, SQS, ElastiCache  <br />
`+` ELK (Elastic Search + Log Stash + Kibana) <br />
`+` AWS EMR Spark, Kinesis, Redis <br />
`+` Zeppelin <br />
`+` AWS Certificate Manager(ACM) <br />
`+` Private Subnet, NAT Gateway <br />
**`+` Microservice Architecture(MSA), Spring Boot + Spring Cloud** <br />
**`+` Fraud Detection System(FDS)** <br />
**`+` AWS QuickSight, Route53** <br />

- [`AWS QuickSight`](https://aws.amazon.com/ko/documentation/quicksight/)
	- Amazon QuickSight는 데이터를 사용하여 시각화를 구축하고, 임의 분석을 수행하고, 신속하게 비즈니스 통찰을 얻을 수 있는 빠른 비즈니스 분석 서비스입니다. QuickSight는 AWS 데이터 소스를 원활하게 검색하고, 조직이 수십만 명의 사용자로 확장할 수 있도록 지원하며, 강력한 인 메모리 엔진(SPICE)을 사용하여 속도와 응답성이 뛰어난 쿼리 성능을 제공합니다. 
- [`Amazon Route53`](https://aws.amazon.com/ko/route53/)
	- Amazon Route 53은 가용성과 확장성이 우수한 클라우드 Domain Name System(DNS) 웹 서비스입니다. 이 서비스는 www.example.com과 같은 이름을 192.0.2.1과 같이 컴퓨터 간 연결을 위해 사용되는 숫자로 된 IP 주소로 변환합니다. 따라서 개발자와 기업은 최종 사용자를 인터넷 애플리케이션에 매우 안정적이며 비용 효율적으로 연결할 수 있습니다. 또한, Amazon Route 53은 IPv6와 완벽히 호환됩니다.
- [`FDS` 이상금융거래탐지시스템](https://www.bloter.net/archives/296444){:target="_blank"}

![FDS work](https://www.bloter.net/wp-content/uploads/2017/11/how-it-works-FDS-800x503.png){:target="_blank"} 

{:.image-caption}
*출처: [FDS work](https://www.bloter.net/archives/296444){:target="_blank"}*
- [`MicroService Architecture`](https://docs.microsoft.com/ko-kr/dotnet/standard/microservices-architecture/architect-microservice-container-applications/communication-in-microservice-architecture)
- Spring Framework
	- [`Spring Boot`](https://projects.spring.io/spring-boot/)
	- [`Spring Cloud`](http://projects.spring.io/spring-cloud/)

3000만
-----

VPC + Public ELB  <br />
`+` DB Replication + Jira/Wiki/CMS + Jenkins + Memcached + RabbitMQ <br />
`+` CloudWatch Logs <br />
`+` Auto Scaling + AWS RDS, DMS, SQS, ElastiCache  <br />
`+` ELK (Elastic Search + Log Stash + Kibana) <br />
`+` AWS EMR Spark, Kinesis, Redis <br />
`+` Zeppelin <br />
`+` AWS Certificate Manager(ACM) <br />
`+` Private Subnet, NAT Gateway <br />
`+` Microservice Architecture(MSA), Spring Boot + Spring Cloud <br />
`+` Fraud Detection System(FDS) <br />
`+` AWS QuickSight, Route53 <br />
**`+` AWS Inspector** <br />
**`+` CloudFront + WAF** <br />
**`+` AWS CloudTrail, AWS Config, VPC Flow Log** <br />
**`+` S3** <br />
**`+` Zabbix + Grafana** <br />
**`+` IAM Role, OpenVPN** <br />

- [`AWS Inspector`](https://aws.amazon.com/ko/inspector/)
	- Amazon Inspector는 AWS 리소스의 보안 및 규정 준수를 개선하는 데 도움이 되는 보안 취약성 평가 서비스입니다. Amazon Inspector는 리소스의 취약성 또는 모범 사례와의 편차를 자동으로 평가한 후, 심각도 수준에 따라 우선순위가 지정된 상세한 보안 평가 결과 목록을 생성합니다. Amazon Inspector에는 AWS 보안 연구원이 정기적으로 업데이트하는 일반 보안 표준 및 취약성 정의와 매핑된 규칙 수백 개의 기술 자료가 포함되어 있습니다.
- [`Amazon CloudFront`](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) 
	- Amazon CloudFront는 .html, .css, .js 및 이미지 파일과 같은 정적 및 동적 웹 콘텐츠를 사용자에게 더 빨리 배포하도록 지원하는 웹 서비스입니다. CloudFront는 엣지 로케이션이라고 하는 데이터 센터의 전 세계 네트워크를 통해 콘텐츠를 제공합니다. CloudFront를 통해 서비스하는 콘텐츠를 사용자가 요청하면 지연 시간이 가장 낮은 엣지로 라우팅되므로 콘텐츠 전송 성능이 뛰어납니다. 콘텐츠가 이미 지연 시간이 가장 낮은 엣지에 있는 경우 CloudFront가 콘텐츠를 즉시 제공합니다. 콘텐츠가 엣지에 없는 경우 CloudFront에서는 콘텐츠의 최종 버전의 원본으로 식별한 Amazon S3 버킷 또는 HTTP 서버(예: 웹 서버)에서 콘텐츠를 검색합니다. 
- [`AWS WAF`](https://aws.amazon.com/ko/waf/)
	- Web Application Firewall
	- AWS WAF는 애플리케이션 가용성에 영향을 주거나, 보안을 약화하거나, 리소스를 과도하게 사용하는 일반적인 웹 취약점 공격으로부터 웹 애플리케이션을 보호하는 데 도움이 되는 웹 애플리케이션 방화벽입니다. AWS WAF를 사용하면 사용자 정의 가능한 웹 보안 규칙을 정의함으로써 어떤 트래픽에 웹 애플리케이션에 대한 액세스를 허용하거나 차단할지 제어할 수 있습니다. AWS WAF에서는 SQL 명령어 주입이나 교차 사이트 스크립팅 등 일반적인 공격 패턴을 차단하는 사용자 지정 규칙과 특정 애플리케이션을 위해 설계된 규칙을 생성할 수 있습니다. 몇 분 이내에 새로운 규칙이 배포되므로 변화하는 트래픽 패턴에 신속하게 대응할 수 있습니다. 또한, AWS WAF에는 웹 보안 규칙의 생성, 배포 및 유지보수를 자동화하는 데 사용할 수 있는 모든 기능을 갖춘 API가 포함되어 있습니다.
- [`AWS CloudTrail`](https://aws.amazon.com/ko/documentation/cloudtrail/)
	- AWS CloudTrail에서는 AWS Management Console, AWS SDK, 명령줄 도구 및 상위 수준의 AWS 서비스를 통해 수행된 API 호출 등 계정의 AWS API 호출 이력을 확보하여 클라우드상의 AWS 배포를 모니터링할 수 있습니다. 또한, CloudTrail을 지원하는 서비스에 대해 AWS API를 호출한 사용자와 계정, 호출이 이루어진 소스 IP 주소, 그리고 호출이 발생한 시간을 파악할 수 있습니다. API를 사용해 CloudTrail을 애플리케이션에 통합하고, 조직에 대한 추적 생성을 자동화하고, 추적 상태를 확인하며, 관리자가 CloudTrail 로깅을 활성화 및 비활성화하는 방식을 제어할 수 있습니다. 
- [`AWS Config`](https://aws.amazon.com/ko/config/)
	- AWS Config는 AWS 리소스 구성을 측정, 감사 및 평가하게 해주는 서비스입니다. Config는 AWS 리소스 구성을 지속적으로 모니터링 및 기록하고, 원하는 구성을 기준으로 기록된 구성을 자동으로 평가해 줍니다. Config를 사용하면 AWS 리소스 간 구성 및 관계 변화를 검토하고, 자세한 리소스 구성 기록을 분석하고, 내부 지침에 지정되어 있는 구성을 기준으로 전반적인 규정 준수 여부를 확인할 수 있습니다. 이에 따라 규정 준수 감사, 보안 분석, 변경 관리 및 운영 문제 해결 작업을 간소화할 수 있습니다. 
- [`VPC Flow Logs`](https://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/flow-logs.html)
	- VPC 흐름 로그는 VPC의 네트워크 인터페이스에서 전송되고 수신되는 IP 트래픽에 대한 정보를 수집할 수 있는 기능입니다. 흐름 로그 데이터는 Amazon CloudWatch Logs를 사용하여 저장됩니다. 흐름 로그를 생성하고 난 다음 Amazon CloudWatch Logs의 데이터를 확인하고 가져올 수 있습니다. 
- [`AWS S3`](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/dev/Welcome.html)
	- Amazon Simple Storage Service는
	- 인터넷용 스토리지 서비스입니다. 개발자가 보다 쉽게 웹 규모 컴퓨팅 작업을 할 수 있도록 설계되었습니다. Amazon S3에서 제공하는 단순한 웹 서비스 인터페이스를 사용하여 웹에서 언제 어디서나 원하는 양의 데이터를 저장하고 검색할 수 있습니다. 또한 개발자는 Amazon이 자체 웹 사이트의 글로벌 네트워크 운영에 사용하는 것과 같은 높은 확장성과 신뢰성을 갖춘 빠르고 경제적인 데이터 스토리지 인프라에 액세스할 수 있습니다. 이 서비스의 목적은 규모의 이점을 극대화하고 개발자들에게 이러한 이점을 제공하는 것입니다.
- [`IAM Role`]
	- [`IAM Role Document`](https://docs.aws.amazon.com/ko_kr/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html)
	- [`IAM 역할 `](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)

- [`OpenVPN`](https://openvpn.net/)
	- Virtual Private Network
	- 오픈VPN(OpenVPN)은 라우팅 구성이나 브리지 구성, 원격 접근 기능을 통해 안전한 점대점 또는 사이트 대 사이트 연결을 만들기 위해 가상 사설망(VPN) 기술을 구현하는 오픈 소스 형태의 응용 소프트웨어이다. 키 교환을 위해 SSL/TLS를 이용하는 [맞춤식 보안 프로토콜](https://openvpn.net/index.php/open-source/documentation/security-overview.html)을 이용한다. 네트워크 주소 변환(NAT)과 방화벽을 가로지를 수 있다. 제임스 요난이 작성하였으며 GNU GPL 하에 출시되고 있다
- [`Zabbix`](https://www.zabbix.com/)
	- Monitor Anything
- [`Grafana`](https://grafana.com/plugins/alexanderzobnin-zabbix-app)
	- Zabbix plugin for Grafana

