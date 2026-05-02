📌 Campus Ally
Campus Ally is a student-focused web application designed to centralize campus communication and promote mental wellness. Built using React, Firebase, and Gemini API, it helps students stay updated with events, check in on their emotional state, and interact with an intelligent AI chatbot — all in one place.

🚀 Features
🧠 AI Chatbot
Ask general or campus-related questions. Responses are powered by Google’s Gemini API.

🧘 Wellness Form
A simple form asks students how they’re feeling and provides motivational messages via AI.

📅 Events Dashboard
Displays upcoming campus and GDG events using data from Firebase Firestore.

🔐 Authentication
Email-based sign-up/login using Firebase Authentication.


EXP 1: ***Analysing Android App Permissions and Mobile Traffic***
✅ STEP 1: Install & Open Android Studio
Open AVD Manager
Create device (Pixel 2 / Pixel 9)

👉 Start the emulator

✅ STEP 2: Start Emulator with Proxy

Open Command Prompt:

cd C:\Users\Admin\AppData\Local\Android\Sdk\emulator
emulator -list-avds

You’ll see:

Pixel_2
Pixel_9

Run:

emulator -avd Pixel_9 -http-proxy http://10.0.2.2:8080

💡 Important:

10.0.2.2 = your system (host machine)
8080 = Burp Suite port
✅ STEP 3: Setup Proxy in Emulator

Inside emulator:

Settings → Network → Internet → Edit → Advanced
Proxy → Manual
Hostname → 10.0.2.2
Port → 8080

👉 If NOT saving → use ADB:

cd C:\Users\Admin\AppData\Local\Android\Sdk\platform-tools
adb devices
adb shell settings put global http_proxy 10.0.2.2:8080

(Shown clearly in page 4 of your doc )

✅ STEP 4: Setup Burp Suite

Open Burp → Go to:

Proxy → Options → Proxy Listeners
Set:
Port: 8080
Interface: All interfaces

Turn ON:

Intercept ON
✅ STEP 5: Test HTTP Traffic

In emulator:

Open Chrome
Visit: http://example.com

👉 In Burp:

Go to HTTP History
You will see requests

✔️ SUCCESS → HTTP captured

🔐 STEP 6: Capture HTTPS (IMPORTANT)

By default:
❌ HTTPS won’t show

So we install certificate.

🔹 Export Certificate from Burp
Proxy → Options → Import/Export CA Certificate
→ Save as burpcer.der
🔹 Push to Emulator
adb push C:\Users\Admin\Downloads\burpcer.cer /sdcard/Download/
🔹 Install Certificate in Emulator

Go to:

Settings → Security → Encryption → Install Certificate → CA Certificate
✅ STEP 7: Verify HTTPS

Now:

Open https://example.com

👉 In Burp:

Go to HTTP History

✔️ You will now see HTTPS traffic
















 EXP 2:***Testing IoT Device Security (Default Passwords & Open Ports)*** 
✅ STEP 1: Run IoT Simulation (VERY IMPORTANT)

Command:

docker run -d -p 8090:3000 --name juiceshop bkimminich/juice-shop
if not docker start juiceshop

👉 What this does:

Runs Juice Shop
Makes it available at:
http://localhost:8090


✅ STEP 2: Get IP Address

In Windows:

ipconfig

👉 Find:

IPv4 Address → 192.168.x.x

(Shown in page 3 image )

✅ STEP 3: Scan using Nmap

In Kali Linux:
nmap localhost
nmap -sV 192.168.x.x

👉 What happens:

Finds open ports
Detects services
Shows versions

✔️ Example output (page 4 image):

port 8090 → open
service → HTTP
✅ STEP 4: Analyze Scan Results

From your doc (page 7):

You will see:

Open ports
Service name
Version info

👉 This is called:

Service Enumeration
✅ STEP 5: Access Web Dashboard

Open browser:

http://localhost:8090

👉 You’ll see Juice Shop UI (page 5 image)

✅ STEP 6: Test Default Password

Try login:

admin credentials (default)

👉 If login works → ❌ Vulnerability
Email: admin@juice-sh.op
Password: admin123
✔️ Your doc shows:

Successful login using default credentials (page 6)
✅ STEP 7: Check Network Traffic

Open:

Developer Tools → Network tab

👉 Observe:

Requests in plain text
No HTTPS

✔️ Means:
❌ Data is not secure



EXP 3:***Creating and Analyzing Disk Images Using dc3dd and Autopsy (Alternative to FTK Imager)***
***EVERYTHING TO BE DONE IN KALI LINUX***
. EXECUTION (SUPER SIMPLIFIED)
✅ STEP 1: Open Terminal
Ctrl + Alt + T
✅ STEP 2: Create Evidence File
echo "Cybersecurity Lab Evidence" > evidence.txt
ls

👉 This file is your proof

(page 3 shows this clearly )

✅ STEP 3: Identify Disk
lsblk

👉 You’ll see:

sda
 ├─sda1

✔️ Use /dev/sda1

✅ STEP 4: Create Disk Image
dd if=/dev/zero of=practice_disk.dd bs=1M count=100

👉 Creates:

100MB disk file

(page 4 screenshot shows output )

✅ STEP 5: Format Disk
mkfs.ext4 practice_disk.dd

👉 Makes it usable file system

✅ STEP 6: Verify Image
ls -lh /home/kali/disk_image.dd
cat /home/kali/acquisition.log

👉 Check:

size
hash
logs

(page 5 shows this )

✅ STEP 7: Start Autopsy
autopsy

👉 Open browser:

http://localhost:9999/autopsy

(page 6–7 shows this )

✅ STEP 8: Create Case

In browser:

Click Create New Case
Enter details

(page 7 screenshot)

✅ STEP 9: Add Disk Image

👉 Select:

Add Host → Add Image

Choose:

/home/kali/disk_image.dd

(page 8)

✅ STEP 10: Analyze Evidence

👉 You can:

view files
search keywords
find deleted data

(page 12–13 shows analysis UI)







EXP 4:***NETWORK FORENSICS USING WIRESHARK***
STEP 1: Open Wireshark

👉 🟢 Kali Linux Terminal

wireshark &
✅ STEP 2: Select Interface

👉 🔵 Wireshark GUI

Select:
eth0 

✔️ This is your network interface (page 1 image)

✅ STEP 3: Start Capturing

👉 🔵 GUI

Click Start (shark fin icon)

👉 Now packets start capturing

✅ STEP 4: Generate Traffic

👉 🔵 Browser (inside Kali)

Open any website:
google.com
youtube.com

👉 This creates packets to analyze

✅ STEP 5: Apply Filters

👉 🔵 Wireshark filter bar

Type:

tcp

👉 Shows only TCP packets

Try:

udp
http

✔️ (Shown in page 2 )

✅ STEP 6: Filter by IP
ip.addr == 192.168.x.x

👉 Shows packets of specific IP

OR:

ip.src == 192.168.x.x

✔️ Source filtering (page 3)

✅ STEP 7: Follow TCP Stream

👉 Right click any TCP packet:

Follow → TCP Stream

✔️ Shows full conversation

🧠 What you observe (VERY IMPORTANT)
Red → sender
Blue → receiver
Shows full communication

(page 4 explanation )

✅ STEP 8: Detect Suspicious Traffic

👉 🟢 Kali Terminal:

nmap -sS <target_IP>
target_IP can be given our ip
👉 Then in Wireshark filter:

tcp.flags.syn == 1 && tcp.flags.ack == 0

✔️ Detects port scanning (page 5)

✅ STEP 9: Statistics Analysis

👉 🔵 Wireshark menu:

Statistics → Capture File Properties
Statistics → Protocol Hierarchy
Statistics → Conversations
Statistics → Endpoints
✅ STEP 10: Graphs

👉 🔵 Wireshark:

Statistics → I/O Graphs

✔️ Shows traffic over time


















exp:5***LOG FILE ANALYSIS FOR INCIDENT DETECTION LAB*** 

IMPORTANT RULE

👉 Everything is done in:
🟢 Kali Linux Terminal (NOT Windows CMD)

✅ STEP 1: Go to Logs Folder

👉 🟢 Kali Terminal

cd /var/log
ls

👉 You’ll see:

apache2
nginx
journal
wtmp, btmp

(page 1–2 )

✅ STEP 2: Check Successful Logins
last

👉 Shows login history

✅ STEP 3: View System Logs
journalctl | less

👉 Scroll logs

✅ STEP 4: Find Failed Logins
journalctl | grep "Failed"

👉 Shows failed attempts

(page 3)

✅ STEP 5: Check SSH Activity
journalctl | grep ssh

👉 Shows login attempts

✅ STEP 6: Find Errors
journalctl | grep -i error

👉 Detect abnormal behavior

✅ STEP 7: Apache Log Analysis
cd /var/log/apache2
ls
sudo less access.log

👉 Shows web activity

✅ STEP 8: Detect Suspicious Requests
grep "404" /var/log/apache2/access.log

👉 Many 404 → scanning attack

✅ STEP 9: Real-Time Monitoring
sudo journalctl -f

👉 Live logs

🔥 IMPORTANT PART (SCORING)
✅ STEP 10: Simulate Attack (VERY IMPORTANT)

👉 🟢 Kali Terminal

Start SSH:

sudo service ssh start

Get IP:

ip a
✅ STEP 11: Generate Failed Logins
ssh fakeuser@localhost

👉 Enter wrong password multiple times

(page 9 )

✅ STEP 12: Analyze Failed Attempts
journalctl | grep "Failed password"

👉 Output like:

Failed password for kali from 127.0.0.1
✅ STEP 13: Extract Suspicious IP
journalctl | grep "Failed password" | awk '{print $11}'

👉 Output:

127.0.0.1
✅ STEP 14: Count Attempts
journalctl | grep "Failed password" | awk '{print $11}' | sort | uniq -c | sort -nr

👉 Example:

10 127.0.0.1

✔️ Means attack from that IP

✅ STEP 15: Alternative Method
sudo lastb

👉 Shows failed login records





      EXP:6 ***Privacy Audit + Data Breach Analysis***



   PART 1: WhatsApp Privacy Audit
✅ STEP 1: Install Node.js

👉 🟢 Kali Terminal

sudo apt update
sudo apt install nodejs npm -y
✅ STEP 2: Install Nativefier

👉 🟢 Kali Terminal

sudo npm install -g nativefier
✅ STEP 3: Create WhatsApp Desktop

👉 🟢 Kali Terminal

nativefier https://web.whatsapp.com

👉 Creates folder (shown page 3 )

✅ STEP 4: Run WhatsApp

👉 🟢 Kali Terminal

cd WhatsAppWeb-linux-x64
./WhatsAppWeb

👉 Scan QR → login

✅ STEP 5: Analyze Trackers

👉 🔵 Browser (Kali)

Go to:

https://reports.exodus-privacy.eu.org

Search:
👉 WhatsApp

👉 You’ll see:

trackers
permissions

(page 6)

✅ STEP 6: Start Wireshark

👉 🟢 Kali Terminal

wireshark &

👉 Select interface (eth0)

✅ STEP 7: Generate Traffic

👉 🔵 WhatsApp App

Send messages
Send images
✅ STEP 8: Apply Filters

👉 🔵 Wireshark

tls
dns
🔍 OBSERVATION (VERY IMPORTANT)

From page 9 :

Traffic is encrypted (TLS)
Domains:
whatsapp.net
facebook.com
Message content NOT visible




***EXP 7: Security Audit & Risk Assessment***


🚨 IMPORTANT RULE

👉 This experiment is done in:
🟣 Windows OS (NOT Kali Linux)

✅ STEP 1: System Information

👉 🟣 Windows Run

Press:

Windows + R

Type:

msinfo32

👉 Note:

OS version
system type

(page 1–2 )

✅ STEP 2: Check Windows Updates

👉 🟣 Windows Settings

Settings → Windows Update
Click Check for updates

✔ Observation:

updates pending = risk

(page 3)

✅ STEP 3: Check Firewall

👉 🟣 Windows Search

Search:

Windows Defender Firewall

Check:

ON / OFF

✔ Your doc says:

managed by Kaspersky (page 4)
✅ STEP 4: Check Antivirus

👉 🟣 Windows Security

Virus & Threat Protection

Check:

Real-time protection → ON
Last scan

✔ Shows system is protected (page 5)

✅ STEP 5: Account Security

👉 🟣 Settings

Accounts → Sign-in options

Check:

Password
PIN / Windows Hello

(page 6–7)

✅ STEP 6: Installed Applications

👉 🟣 Settings

Apps → Installed apps

Check:

unknown apps
cracked software
✅ STEP 7: Startup Programs

👉 🟣 Task Manager

Press:

Ctrl + Shift + Esc

Go:

Startup tab

Disable:

unknown apps
✅ STEP 8: Network Security

👉 🟣 Settings

Network & Internet

Check:

WiFi
Network type

✔ Your doc:

Public network (page 11)
✅ STEP 9: Browser Security

👉 🟣 Chrome / Edge

Settings → Privacy & Security

Check:

Safe browsing ON
remove unknown extensions
✅ STEP 10: Backup

👉 🟣 Windows Search

Search:

Backup settings

Check:

OneDrive backup

✔ Observation:

not configured (page 14)

IMPORTANT PART (EXAM SCORING)
📊 Risk Assessment Table

From page 14 :

Asset	Threat	Vulnerability	Risk	Solution
Files	Data loss	No backup	High	Enable backup
System	Malware	Unknown apps	High	Remove apps
Network	Hacking	Public network	Medium	Use private
Account	Unauthorized access	Weak password	High	Strong password
