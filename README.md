# Kafka Performance testing

### EC2
* m5.large and m5.4xlarge, We recommend using d2.xlarge if you’re using instance storage or r4.xlarge if you’re using EBS.
- m5.xlarge	$0.23	4	16 GiB	EBS Only	Up to 10 Gigabit
- m5.4xlarge	$0.92	16	64 GiB	EBS Only	Up to 10 Gigabit
- d2.xlarge => 
- r4.xlarge	$0.3201	4	30.5 GiB	EBS Only	Up to 10 Gigabit

### EBS
- gp2/gp3 EBS
- We recommend using gp3 if message throughput is your primary requirement. Gp3 disks are provisioned with IOPS and throughput.
By default, a gp3 disk comes with 3000 IOPS and 125 MBps capacity out-of-the-box, which can come at a price when provisioned 
for high capacity.General Purpose SSD (gp3) - Throughput 125 MB/s free and $0.048/provisioned MB/s-month over 125.
