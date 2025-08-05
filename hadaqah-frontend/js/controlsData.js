const ALL_DOMAINS = [
  {
    domainId: "1",
    domainName: "Cybersecurity Governance",
    subdomains: [
      {
        subdomainId: "1-1",
        subdomainName: "Cybersecurity Strategy",
        objective: "To ensure that cybersecurity plans, goals, initiatives and projects are contributing to compliance with related laws and regulations.",
        controls: [
          { controlId: "1-1-1", controlClause: "A cybersecurity strategy must be defined, documented and approved. It must be supported by the head of the organization or his/her delegate (referred to in this document as Authorizing Official). The strategy goals must be in-line with related laws and regulations.", controlReferenceNumber: "1-1-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-1-2", controlClause: "A roadmap must be executed to implement the cybersecurity strategy.", controlReferenceNumber: "1-1-2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-1-3", controlClause: "The cybersecurity strategy must be reviewed periodically according to planned intervals or upon changes to related laws and regulations.", controlReferenceNumber: "1-1-3", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-2",
        subdomainName: "Cybersecurity Management",
        objective: "To ensure Authorizing Official’s support in implementing and managing cybersecurity programs within the organization as per related laws and regulations",
        controls: [
          { controlId: "1-2-1", controlClause: "A dedicated cybersecurity function (e.g., division, department) must be established within the organization. This function must be independent from the Information Technology/Information Communication and Technology (IT/ICT) functions (as per the Royal Decree number 37140 dated 14/8/1438H). It is highly recommended that this cybersecurity function reports directly to the head of the organization or his/her delegate while ensuring that this does not result in a conflict of interest.", controlReferenceNumber: "1-2-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-2-2", controlClause: "All cybersecurity positions must be filled with full-time and qualified Saudi cybersecurity professionals.", controlReferenceNumber: "1-2-2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-2-3", controlClause: "A cybersecurity steering committee must be established by the Authorizing Official to ensure the support and implementation of the cybersecurity programs and initiatives within the organization. Committee members, roles and responsibilities, and governance framework must be defined, documented and approved. The committee must include the head of the cybersecurity function as one of its members. It is highly recommended that the committee reports directly to the head of the organization or his/her delegate while ensuring that this does not result in a conflict of interest.", controlReferenceNumber: "1-2-3", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-3",
        subdomainName: "Cybersecurity Policies and Procedures",
        objective: "To ensure that cybersecurity requirements are documented, communicated and complied with by the organization as per related laws and regulations, and organizational requirements.",
        controls: [
          { controlId: "1-3-1", controlClause: "Cybersecurity policies and procedures must be defined and documented by the cybersecurity function, approved by the Authorizing Official, and disseminated to relevant parties inside and outside the organization.", controlReferenceNumber: "1-3-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-3-2", controlClause: "The cybersecurity function must ensure that the cybersecurity policies and procedures are implemented.", controlReferenceNumber: "1-3-2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-3-3", controlClause: "The cybersecurity policies and procedures must be supported by technical security standards (e.g., operating systems, databases and firewall technical security standards).", controlReferenceNumber: "1-3-3", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-3-4", controlClause: "The cybersecurity policies and procedures must be reviewed periodically according to planned intervals or upon changes to related laws and regulations. Changes and reviews must be approved and documented.", controlReferenceNumber: "1-3-4", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-4",
        subdomainName: "Cybersecurity Roles and Responsibilities",
        objective: "To ensure that roles and responsibilities are defined for all parties participating in implementing the cybersecurity controls within the organization.",
        controls: [
          { controlId: "1-4-1", controlClause: "Cybersecurity organizational structure and related roles and responsibilities must be defined, documented, approved, supported and assigned by the Authorizing Official, while ensuring that this does not result in a conflict of interest.", controlReferenceNumber: "1-4-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-4-2", controlClause: "The cybersecurity roles and responsibilities must be reviewed periodically according to planned intervals or upon changes to related laws and regulations.", controlReferenceNumber: "1-4-2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-5",
        subdomainName: "Cybersecurity Risk Management",
        objective: "To ensure managing cybersecurity risks in a methodological approach in order to protect the organization’s information and technology assets as per organizational policies and procedures, and related laws and regulations.",
        controls: [
          { controlId: "1-5-1", controlClause: "Cybersecurity risk management methodology and procedures must be defined, documented and approved as per confidentiality, integrity and availability considerations of information and technology assets.", controlReferenceNumber: "1-5-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-5-2", controlClause: "The cybersecurity risk management methodology and procedures must be implemented by the cybersecurity function.", controlReferenceNumber: "1-5-2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-6",
        subdomainName: "Cybersecurity in Information and Technology Project Management",
        objective: "To ensure that cybersecurity requirements are included in project management methodology and procedures in order to protect the confidentiality, integrity and availability of information and technology assets as per organization policies and procedures, and related laws and regulations.",
        controls: [
          { controlId: "1-6-1", controlClause: "Cybersecurity requirements must be included in project and asset (information/technology) change management methodology and procedures to identify and manage cybersecurity risks as part of project management lifecycle. The cybersecurity requirements must be a key part of the overall requirements of technology projects.", controlReferenceNumber: "1-6-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-7",
        subdomainName: "Compliance with Cybersecurity Standards, Laws and Regulations",
        objective: "To ensure that the organization’s cybersecurity program is in compliance with related laws and regulations.",
        controls: [
          { controlId: "1-7-1", controlClause: "The organization must comply with related national cybersecurity laws and regulations.", controlReferenceNumber: "1-7-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-8",
        subdomainName: "Periodical Cybersecurity Review and Audit",
        objective: "To ensure that cybersecurity controls are implemented and in compliance with organizational policies and procedures, as well as related national and international laws, regulations and agreements.",
        controls: [
          { controlId: "1-8-1", controlReferenceNumber: "1-8-1", controlType: "Mandatory", controlClause: "Cybersecurity reviews must be conducted periodically by the cybersecurity function in the organization to assess the compliance with the cybersecurity controls in the organization.", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-9",
        subdomainName: "Cybersecurity in Human Resources",
        objective: "To ensure that cybersecurity risks and requirements related to personnel (employees and contractors) are managed efficiently prior to employment, during employment and after termination/separation as per organizational policies and procedures, and related laws and regulations.",
        controls: [
          { controlId: "1-9-1", controlClause: "Personnel cybersecurity requirements (prior to employment, during employment and after termination/separation) must be defined, documented and approved.", controlReferenceNumber: "1-9-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "1-10",
        subdomainName: "Cybersecurity Awareness and Training Program",
        objective: "To ensure that personnel are aware of their cybersecurity responsibilities and have the essential cybersecurity awareness. It is also to ensure that personnel are provided with the required cybersecurity training, skills and credentials needed to accomplish their cybersecurity responsibilities and to protect the organization’s information and technology assets.",
        controls: [
          { controlId: "1-10-1", controlClause: "A cybersecurity awareness program must be developed and approved. The program must be conducted periodically through multiple channels to strengthen the awareness about cybersecurity, cyber threats and risks, and to build a positive cybersecurity awareness culture.", controlReferenceNumber: "1-10-1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-2", controlClause: "The cybersecurity awareness program must be implemented.", controlReferenceNumber: "1-10-2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-3.1", controlClause: "Secure handling of email services, especially phishing emails.", controlReferenceNumber: "1-10-3.1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-3.2", controlClause: "Secure handling of mobile devices and storage media.", controlReferenceNumber: "1-10-3.2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-3.3", controlClause: "Secure Internet browsing.", controlReferenceNumber: "1-10-3.3", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-3.4", controlClause: "Secure use of social media.", controlReferenceNumber: "1-10-3.4", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-4.1", controlClause: "Cybersecurity function’s personnel must receive essential and customized (i.e., tailored to job functions as it relates to cybersecurity) training and access to professional skillsets.", controlReferenceNumber: "1-10-4.1", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-4.2", controlClause: "Personnel working on software/application development and information and technology assets operations must receive essential and customized cybersecurity training.", controlReferenceNumber: "1-10-4.2", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-4.3", controlClause: "Executive and supervisory positions must receive essential and customized cybersecurity training.", controlReferenceNumber: "1-10-4.3", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "1-10-5", controlClause: "The implementation of the cybersecurity awareness program must be reviewed periodically.", controlReferenceNumber: "1-10-5", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      }
    ]
  }
  // ,{ domainId: "2", domainName: "...", subdomains: [...] }
  ,

  {
    domainId: "2",
    domainName: "Cybersecurity Defense",
    subdomains: [
      {
        subdomainId: "2-1",
        subdomainName: "Asset Management",
        objective: "To ensure that the organization has an accurate and detailed inventory of information and technology assets in order to support the organization’s cybersecurity and operational requirements to maintain the confidentiality, integrity and availability of information and technology assets.",
        controls: [
          { controlId: "2-1-1", controlReferenceNumber: "2-1-1", controlClause: "Cybersecurity requirements for managing information and technology assets must be defined, documented and approved.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-1-2", controlReferenceNumber: "2-1-2", controlClause: "The cybersecurity requirements for managing information and technology assets must be implemented.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-1-3", controlReferenceNumber: "2-1-3", controlClause: "Acceptable use policy of information and technology assets must be defined, documented and approved.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-1-4", controlReferenceNumber: "2-1-4", controlClause: "Acceptable use policy of information and technology assets must be implemented.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-1-5", controlReferenceNumber: "2-1-5", controlClause: "Information and technology assets must be classified, labeled and handled as per related law and regulatory requirements.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-1-6", controlReferenceNumber: "2-1-6", controlClause: "The cybersecurity requirements for managing information and technology assets must be reviewed periodically.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "2-2",
        subdomainName: "Identity and Access Management",
        objective: "To ensure the secure and restricted logical access to information and technology assets in order to prevent unauthorized access and allow only authorized accesses for users which are necessary to accomplish assigned tasks.",
        controls: [
          { controlId: "2-2-1", controlReferenceNumber: "2-2-1", controlClause: "Cybersecurity requirements for identity and access management must be defined, documented and approved.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-2-2", controlReferenceNumber: "2-2-2", controlClause: "The cybersecurity requirements for identity and access management must be implemented.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-2-3.1", controlReferenceNumber: "2-2-3.1", controlClause: "Single-factor authentication based on username and password.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-2-3.2", controlReferenceNumber: "2-2-3.2", controlClause: "Multi-factor authentication for remote access, defining suitable authentication factors, number of factors and suitable technique based on the result of impact assessment of authentication failure and bypass for remote access.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-2-3.3", controlReferenceNumber: "2-2-3.3", controlClause: "User authorization based on identity and access control principles: Need-to-Know and Need-to-Use, Least Privilege and Segregation of Duties.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-2-3.4", controlReferenceNumber: "2-2-3.4", controlClause: "Privileged access management.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-2-3.5", controlReferenceNumber: "2-2-3.5", controlClause: "Periodic review of users’ identities and access rights.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-2-4", controlReferenceNumber: "2-2-4", controlClause: "The implementation of the cybersecurity requirements for identity and access management must be reviewed periodically.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      }, 
{
        subdomainId: "2-3",
        subdomainName: "Information System and Information Processing Facilities Protection",
        objective: "To ensure the protection of information systems and information processing facilities (including workstations and infrastructures) against cyber risks.",
        controls: [
          { controlId: "2-3-1", controlReferenceNumber: "2-3-1", controlClause: "Cybersecurity requirements for protecting information systems and information processing facilities must be defined, documented and approved.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-3-2", controlReferenceNumber: "2-3-2", controlClause: "The cybersecurity requirements for protecting information systems and information processing facilities must be implemented.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-3-3.1", controlReferenceNumber: "2-3-3.1", controlClause: "Advanced, up-to-date and secure management of malware and virus protection on servers and workstations.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-3-3.2", controlReferenceNumber: "2-3-3.2", controlClause: "Restricted use and secure handling of external storage media.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-3-3.3", controlReferenceNumber: "2-3-3.3", controlClause: "Patch management for information systems, software and devices.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-3-3.4", controlReferenceNumber: "2-3-3.4", controlClause: "Centralized clock synchronization with an accurate and trusted source (e.g., Saudi Standards, Metrology and Quality Organization (SASO)).", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-3-4", controlReferenceNumber: "2-3-4", controlClause: "The cybersecurity requirements for protecting information systems and information processing facilities must be reviewed periodically.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      },
      {
        subdomainId: "2-4",
        subdomainName: "Email Protection",
        objective: "To ensure the protection of email service from cyber risks.",
        controls: [
          { controlId: "2-4-1", controlReferenceNumber: "2-4-1", controlClause: "Cybersecurity requirements for protecting email service must be defined, documented and approved.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-4-2", controlReferenceNumber: "2-4-2", controlClause: "The cybersecurity requirements for email service must be implemented.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-4-3.1", controlReferenceNumber: "2-4-3.1", controlClause: "Analyzing and filtering email messages (specifically phishing emails and spam) using advanced and up-to-date email protection techniques.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-4-3.2", controlReferenceNumber: "2-4-3.2", controlClause: "Multi-factor authentication for remote and webmail access to email service, defining authentication factors, number of factors and suitable technique based on the result of impact assessment of authentication failure and bypass.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-4-3.3", controlReferenceNumber: "2-4-3.3", controlClause: "Email archiving and backup.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-4-3.4", controlReferenceNumber: "2-4-3.4", controlClause: "Secure management and protection against Advanced Persistent Threats (APT), which normally utilize zero-day viruses and malware.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-4-3.5", controlReferenceNumber: "2-4-3.5", controlClause: "Validation of the organization’s email service domains through Haseen platform by using Sender Policy Framework (SPF), Domain Keys Identified Mail (DKIM), and Domain Message Authentication Reporting and Conformance (DMARC).", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" },
          { controlId: "2-4-4", controlReferenceNumber: "2-4-4", controlClause: "The cybersecurity requirements for email service must be reviewed periodically.", controlType: "Mandatory", complianceLevel: "", remarks: "", correctiveProcedures: "", expectedComplianceDate: "" }
        ]
      }, 
{
  "subdomainId": "2-5",
  "subdomainName": "Networks Security Management",
  "objective": "To ensure the protection of organization’s network from cyber risks.",
  "controls": [
    {
      "controlId": "2-5-1",
      "controlReferenceNumber": "2-5-1",
      "controlClause": "Cybersecurity requirements for network security management must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-2",
      "controlReferenceNumber": "2-5-2",
      "controlClause": "The cybersecurity requirements for network security management must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.1",
      "controlReferenceNumber": "2-5-3.1",
      "controlClause": "Logical or physical segregation and segmentation of network segments using firewalls and defense-in-depth principles.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.2",
      "controlReferenceNumber": "2-5-3.2",
      "controlClause": "Network segregation between production, test and development environments.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.3",
      "controlReferenceNumber": "2-5-3.3",
      "controlClause": "Secure browsing and Internet connectivity including restrictions on the use of file storage/sharing and remote access websites, and protection against suspicious websites.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.4",
      "controlReferenceNumber": "2-5-3.4",
      "controlClause": "Wireless network protection using strong authentication and encryption techniques. A comprehensive risk assessment and management exercise must be conducted to assess and manage the cyber risks prior to connecting any wireless networks to the organization’s internal network.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.5",
      "controlReferenceNumber": "2-5-3.5",
      "controlClause": "Management and restrictions on network services, protocols and ports.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.6",
      "controlReferenceNumber": "2-5-3.6",
      "controlClause": "Intrusion Prevention Systems (IPS).",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.7",
      "controlReferenceNumber": "2-5-3.7",
      "controlClause": "Security of Domain Name Service (DNS) through Haseen platform.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.8",
      "controlReferenceNumber": "2-5-3.8",
      "controlClause": "Secure management and protection of Internet browsing channel against Advanced Persistent Threats (APT), which normally utilize zero-day viruses and malware.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-3.9",
      "controlReferenceNumber": "2-5-3.9",
      "controlClause": "Protecting against Distributed Denial of Service (DDoS) attacks to limit risks arising from these attacks.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-5-4",
      "controlReferenceNumber": "2-5-4",
      "controlClause": "The cybersecurity requirements for network security management must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-6",
  "subdomainName": "Mobile Devices Security",
  "objective": "To ensure the protection of mobile devices (including laptops, smartphones, tablets) from cyber risks and to ensure the secure handling of the organization’s information (including sensitive information) while utilizing Bring Your Own Device (BYOD) policy.",
  "controls": [
    {
      "controlId": "2-6-1",
      "controlReferenceNumber": "2-6-1",
      "controlClause": "Cybersecurity requirements for mobile devices security and BYOD must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-6-2",
      "controlReferenceNumber": "2-6-2",
      "controlClause": "The cybersecurity requirements for mobile devices security and BYOD must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-6-3.1",
      "controlReferenceNumber": "2-6-3.1",
      "controlClause": "Separation and encryption of organization’s data and information stored on mobile devices and BYODs.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-6-3.2",
      "controlReferenceNumber": "2-6-3.2",
      "controlClause": "Controlled and restricted use based on job requirements.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-6-3.3",
      "controlReferenceNumber": "2-6-3.3",
      "controlClause": "Secure wiping of organization’s data and information stored on mobile devices and BYOD in cases of device loss, theft or after termination/separation from the organization.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-6-3.4",
      "controlReferenceNumber": "2-6-3.4",
      "controlClause": "Security awareness for mobile devices users.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-6-4",
      "controlReferenceNumber": "2-6-4",
      "controlClause": "The cybersecurity requirements for mobile devices security and BYOD must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-7",
  "subdomainName": "Data and Information Protection",
  "objective": "To ensure the confidentiality, integrity and availability of organization’s data and information as per organizational policies and procedures, and related laws and regulations.",
  "controls": [
    {
      "controlId": "2-7-1",
      "controlReferenceNumber": "2-7-1",
      "controlClause": "Cybersecurity requirements for protecting and handling data and information must be defined, documented and approved as per the related laws and regulations.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-7-2",
      "controlReferenceNumber": "2-7-2",
      "controlClause": "The cybersecurity requirements for protecting and handling data and information must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-7-3",
      "controlReferenceNumber": "2-7-3",
      "controlClause": "The cybersecurity requirements for protecting and handling data and information must include at least the applicable requirements in Data Cybersecurity Controls published by NCA.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-7-4",
      "controlReferenceNumber": "2-7-4",
      "controlClause": "The cybersecurity requirements for protecting and handling data and information must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},

,
{
  "subdomainId": "2-8",
  "subdomainName": "Cryptography",
  "objective": "To ensure the proper and efficient use of cryptography to protect information assets as per organizational policies and procedures, and related laws and regulations.",
  "controls": [
    {
      "controlId": "2-8-1",
      "controlReferenceNumber": "2-8-1",
      "controlClause": "Cybersecurity requirements for cryptography must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-8-2",
      "controlReferenceNumber": "2-8-2",
      "controlClause": "The cybersecurity requirements for cryptography must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-8-3",
      "controlReferenceNumber": "2-8-3",
      "controlClause": "The cybersecurity requirements for cryptography must include at least the requirements in the National Cryptographic Standards published by NCA. Each national entity is required to choose and implement the appropriate cryptographic standard level based on the nature and sensitivity of the data, systems and networks to be protected, and based on the risk assessment by the entity; and as per related laws and regulations.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-8-3.1",
          "subcontrolClause": "Approved cryptographic systems and solutions standards and its technical and regulatory limitations."
        },
        {
          "subcontrolId": "2-8-3.2",
          "subcontrolClause": "Secure management of cryptographic keys during their lifecycles."
        },
        {
          "subcontrolId": "2-8-3.3",
          "subcontrolClause": "Encryption of data in-transit, at-rest, and while processing as per classification and related laws and regulations."
        }
      ]
    },
    {
      "controlId": "2-8-4",
      "controlReferenceNumber": "2-8-4",
      "controlClause": "The cybersecurity requirements for cryptography must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-9",
  "subdomainName": "Backup and Recovery Management",
  "objective": "To ensure the protection of organization’s data and information including information systems and software configurations from cyber risks as per organizational policies and procedures, and related laws and regulations.",
  "controls": [
    {
      "controlId": "2-9-1",
      "controlReferenceNumber": "2-9-1",
      "controlClause": "Cybersecurity requirements for backup and recovery management must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-9-2",
      "controlReferenceNumber": "2-9-2",
      "controlClause": "The cybersecurity requirements for backup and recovery management must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-9-3",
      "controlReferenceNumber": "2-9-3",
      "controlClause": "The cybersecurity requirements for backup and recovery management must include at least the following:",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-9-3.1",
          "subcontrolClause": "Scope and coverage of backups to cover critical technology and information assets."
        },
        {
          "subcontrolId": "2-9-3.2",
          "subcontrolClause": "Ability to perform quick recovery of data and systems after cybersecurity incidents."
        },
        {
          "subcontrolId": "2-9-3.3",
          "subcontrolClause": "Periodic tests of backups."
        }
      ]
    },
    {
      "controlId": "2-9-4",
      "controlReferenceNumber": "2-9-4",
      "controlClause": "The cybersecurity requirements for backup and recovery management must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-10",
  "subdomainName": "Vulnerabilities Management",
  "objective": "To ensure timely detection and effective remediation of technical vulnerabilities to prevent or minimize the probability of exploiting these vulnerabilities to launch cyber-attacks against the organization.",
  "controls": [
    {
      "controlId": "2-10-1",
      "controlReferenceNumber": "2-10-1",
      "controlClause": "Cybersecurity requirements for technical vulnerabilities management must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-10-2",
      "controlReferenceNumber": "2-10-2",
      "controlClause": "The cybersecurity requirements for technical vulnerabilities management must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-10-3",
      "controlReferenceNumber": "2-10-3",
      "controlClause": "The cybersecurity requirements for technical vulnerabilities management must include at least the following:",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-10-3.1",
          "subcontrolClause": "Periodic vulnerabilities assessments."
        },
        {
          "subcontrolId": "2-10-3.2",
          "subcontrolClause": "Vulnerabilities classification based on criticality level."
        },
        {
          "subcontrolId": "2-10-3.3",
          "subcontrolClause": "Vulnerabilities remediation based on classification and associated risk levels."
        },
        {
          "subcontrolId": "2-10-3.4",
          "subcontrolClause": "Security patch management."
        },
        {
          "subcontrolId": "2-10-3.5",
          "subcontrolClause": "Subscription with authorized and trusted cybersecurity resources for up-to-date information and notifications on technical vulnerabilities."
        }
      ]
    },
    {
      "controlId": "2-10-4",
      "controlReferenceNumber": "2-10-4",
      "controlClause": "The cybersecurity requirements for technical vulnerabilities management must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
}
, 

{
  "subdomainId": "2-11",
  "subdomainName": "Penetration Testing",
  "objective": "To assess and evaluate the efficiency of the organization’s cybersecurity defense capabilities through simulated cyber-attacks to discover unknown weaknesses within the technical infrastructure that may lead to a cyber breach.",
  "controls": [
    {
      "controlId": "2-11-1",
      "controlReferenceNumber": "2-11-1",
      "controlClause": "Cybersecurity requirements for penetration testing exercises must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-11-2",
      "controlReferenceNumber": "2-11-2",
      "controlClause": "The cybersecurity requirements for penetration testing processes must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-11-3",
      "controlReferenceNumber": "2-11-3",
      "controlClause": "The cybersecurity requirements for penetration testing processes must include at least the following:",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-11-3.1",
          "subcontrolClause": "Scope of penetration tests which must cover Internet-facing services and its technical components including infrastructure, websites, web applications, mobile apps, email and remote access."
        },
        {
          "subcontrolId": "2-11-3.2",
          "subcontrolClause": "Conducting penetration tests periodically."
        }
      ]
    },
    {
      "controlId": "2-11-4",
      "controlReferenceNumber": "2-11-4",
      "controlClause": "Cybersecurity requirements for penetration testing processes must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-12",
  "subdomainName": "Cybersecurity Event Logs and Monitoring Management",
  "objective": "To ensure timely collection, analysis and monitoring of cybersecurity events for early detection of potential cyber-attacks in order to prevent or minimize the negative impacts on the organization’s operations.",
  "controls": [
    {
      "controlId": "2-12-1",
      "controlReferenceNumber": "2-12-1",
      "controlClause": "Cybersecurity requirements for event logs and monitoring management must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-12-2",
      "controlReferenceNumber": "2-12-2",
      "controlClause": "The cybersecurity requirements for event logs and monitoring management must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-12-3",
      "controlReferenceNumber": "2-12-3",
      "controlClause": "The cybersecurity requirements for event logs and monitoring management must include at least the following:",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-12-3.1",
          "subcontrolClause": "Activation of cybersecurity event logs on critical information assets."
        },
        {
          "subcontrolId": "2-12-3.2",
          "subcontrolClause": "Activation of cybersecurity event logs on remote access and privileged user accounts."
        },
        {
          "subcontrolId": "2-12-3.3",
          "subcontrolClause": "Identification of required technologies (e.g., SIEM) for cybersecurity event logs collection."
        },
        {
          "subcontrolId": "2-12-3.4",
          "subcontrolClause": "Continuous monitoring of cybersecurity events."
        },
        {
          "subcontrolId": "2-12-3.5",
          "subcontrolClause": "Retention period for cybersecurity event logs (must be 12 months minimum)."
        }
      ]
    },
    {
      "controlId": "2-12-4",
      "controlReferenceNumber": "2-12-4",
      "controlClause": "The cybersecurity requirements for event logs and monitoring management must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-13",
  "subdomainName": "Cybersecurity Incident and Threat Management",
  "objective": "To ensure timely identification, detection, effective management and handling of cybersecurity incidents and threats to prevent or minimize negative impacts on organization’s operation taking into consideration the Royal Decree number 37140 dated 14/8/1438H.",
  "controls": [
    {
      "controlId": "2-13-1",
      "controlReferenceNumber": "2-13-1",
      "controlClause": "Requirements for cybersecurity incidents and threat management must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-13-2",
      "controlReferenceNumber": "2-13-2",
      "controlClause": "The requirements for cybersecurity incidents and threat management must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-13-3",
      "controlReferenceNumber": "2-13-3",
      "controlClause": "The requirements for cybersecurity incidents and threat management must include at least the following:",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-13-3.1",
          "subcontrolClause": "Cybersecurity incident response plans and escalation procedures."
        },
        {
          "subcontrolId": "2-13-3.2",
          "subcontrolClause": "Cybersecurity incidents classification."
        },
        {
          "subcontrolId": "2-13-3.3",
          "subcontrolClause": "Cybersecurity incidents reporting to NCA."
        },
        {
          "subcontrolId": "2-13-3.4",
          "subcontrolClause": "Sharing incidents notifications, threat intelligence, breach indicators and reports with NCA."
        },
        {
          "subcontrolId": "2-13-3.5",
          "subcontrolClause": "Collecting and handling threat intelligence feeds."
        }
      ]
    },
    {
      "controlId": "2-13-4",
      "controlReferenceNumber": "2-13-4",
      "controlClause": "The requirements for cybersecurity incidents and threat management must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-14",
  "subdomainName": "Physical Security",
  "objective": "To ensure the protection of information and technology assets from unauthorized physical access, loss, theft and damage.",
  "controls": [
    {
      "controlId": "2-14-1",
      "controlReferenceNumber": "2-14-1",
      "controlClause": "Cybersecurity requirements for physical protection of information and technology assets must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-14-2",
      "controlReferenceNumber": "2-14-2",
      "controlClause": "The cybersecurity requirements for physical protection of information and technology assets must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-14-3",
      "controlReferenceNumber": "2-14-3",
      "controlClause": "The cybersecurity requirements for physical protection of information and technology assets must include at least the following:",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-14-3.1",
          "subcontrolClause": "Authorized access to sensitive areas within the organization (e.g., data center, disaster recovery center, sensitive information processing facilities, security surveillance center, network cabinets)."
        },
        {
          "subcontrolId": "2-14-3.2",
          "subcontrolClause": "Facility entry/exit records and CCTV monitoring."
        },
        {
          "subcontrolId": "2-14-3.3",
          "subcontrolClause": "Protection of facility entry/exit and surveillance records."
        },
        {
          "subcontrolId": "2-14-3.4",
          "subcontrolClause": "Secure destruction and re-use of physical assets that hold classified information (including documents and storage media)."
        },
        {
          "subcontrolId": "2-14-3.5",
          "subcontrolClause": "Security of devices and equipment inside and outside the organization’s facilities."
        }
      ]
    },
    {
      "controlId": "2-14-4",
      "controlReferenceNumber": "2-14-4",
      "controlClause": "The cybersecurity requirements for physical protection of information and technology assets must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
},
{
  "subdomainId": "2-15",
  "subdomainName": "Web Application Security",
  "objective": "To ensure the protection of external web applications against cyber risks.",
  "controls": [
    {
      "controlId": "2-15-1",
      "controlReferenceNumber": "2-15-1",
      "controlClause": "Cybersecurity requirements for external web applications must be defined, documented and approved.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-15-2",
      "controlReferenceNumber": "2-15-2",
      "controlClause": "The cybersecurity requirements for external web applications must be implemented.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    },
    {
      "controlId": "2-15-3",
      "controlReferenceNumber": "2-15-3",
      "controlClause": "The cybersecurity requirements for external web applications must include at least the following:",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": "",
      "subcontrols": [
        {
          "subcontrolId": "2-15-3.1",
          "subcontrolClause": "Use of web application firewall."
        },
        {
          "subcontrolId": "2-15-3.2",
          "subcontrolClause": "Adoption of the multi-tier architecture principle."
        },
        {
          "subcontrolId": "2-15-3.3",
          "subcontrolClause": "Use of secure protocols (e.g., HTTPS)."
        },
        {
          "subcontrolId": "2-15-3.4",
          "subcontrolClause": "Clarification of the secure usage policy for users."
        },
        {
          "subcontrolId": "2-15-3.5",
          "subcontrolClause": "User authentication based on defined number and factors of authentication, as a result of impact assessment of authentication failure and bypass for users’ access."
        }
      ]
    },
    {
      "controlId": "2-15-4",
      "controlReferenceNumber": "2-15-4",
      "controlClause": "The cybersecurity requirements for external web applications must be reviewed periodically.",
      "controlType": "Mandatory",
      "complianceLevel": "",
      "remarks": "",
      "correctiveProcedures": "",
      "expectedComplianceDate": ""
    }
  ]
}


    ]
  } , 

  // ,{ domainId: "3", domainName: "...", subdomains: [...] }


{
  "domainId": "3",
  "domainName": "Cybersecurity Resilience",
  "subdomains": [
    {
      "subdomainId": "3-1",
      "subdomainName": "Cybersecurity Resilience Aspects of Business Continuity Management (BCM)",
      "objective": "To ensure the inclusion of the cybersecurity resiliency requirements within the organization’s business continuity management and to remediate and minimize the impacts on systems, information processing facilities and critical e-services from disasters caused by cybersecurity incidents.",
      "controls": [
        {
          "controlId": "3-1-1",
          "controlReferenceNumber": "3-1-1",
          "controlClause": "Cybersecurity requirements for business continuity management must be defined, documented and approved.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "3-1-2",
          "controlReferenceNumber": "3-1-2",
          "controlClause": "The cybersecurity requirements for business continuity management must be implemented.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "3-1-3",
          "controlReferenceNumber": "3-1-3",
          "controlClause": "The cybersecurity requirements for business continuity management must include at least the following:",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "3-1-3.1",
          "controlReferenceNumber": "3-1-3.1",
          "controlClause": "Ensuring the continuity of cybersecurity systems and procedures.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "3-1-3.2",
          "controlReferenceNumber": "3-1-3.2",
          "controlClause": "Developing response plans for cybersecurity incidents that may affect the business continuity.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "3-1-3.3",
          "controlReferenceNumber": "3-1-3.3",
          "controlClause": "Developing disaster recovery plans.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "3-1-4",
          "controlReferenceNumber": "3-1-4",
          "controlClause": "The cybersecurity requirements for business continuity management must be reviewed periodically.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        }
      ]
    }
  ]
}


  
  // ,{ domainId: "4", domainName: "...", subdomains: [...] }

,
{
  "domainId": "4",
  "domainName": "Third-Party and Cloud Computing Cybersecurity",
  "subdomains": [
    {
      "subdomainId": "4-1",
      "subdomainName": "Third-Party Cybersecurity",
      "objective": "To ensure the protection of assets against the cybersecurity risks related to third-parties including outsourcing and managed services as per organizational policies and procedures, and related laws and regulations.",
      "controls": [
        {
          "controlId": "4-1-1",
          "controlReferenceNumber": "4-1-1",
          "controlClause": "Cybersecurity requirements for contracts and agreements with third-parties must be identified, documented and approved.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "4-1-2",
          "controlReferenceNumber": "4-1-2",
          "controlClause": "The cybersecurity requirements for contracts and agreements with third-parties (e.g., Service Level Agreement (SLA)) -which may affect, if impacted, the organization's data or services- must include at least the following:",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": "",
          "subControls": [
            {
              "controlId": "4-1-2-1",
              "controlClause": "Non-disclosure clauses and secure removal of organization’s data by third-parties upon end of service."
            },
            {
              "controlId": "4-1-2-2",
              "controlClause": "Communication procedures in case of cybersecurity incidents."
            },
            {
              "controlId": "4-1-2-3",
              "controlClause": "Requirements for third-parties to comply with related organizational policies and procedures, laws and regulations."
            }
          ]
        },
        {
          "controlId": "4-1-3",
          "controlReferenceNumber": "4-1-3",
          "controlClause": "The cybersecurity requirements for contracts and agreements with IT outsourcing and managed services third-parties must include at least the following:",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": "",
          "subControls": [
            {
              "controlId": "4-1-3-1",
              "controlClause": "Conducting a cybersecurity risk assessment to ensure the availability of risk mitigation controls before signing contracts and agreements or upon changes in related regulatory requirements."
            },
            {
              "controlId": "4-1-3-2",
              "controlClause": "Cybersecurity managed services centers for monitoring and operations must be completely present inside the Kingdom of Saudi Arabia."
            }
          ]
        },
        {
          "controlId": "4-1-4",
          "controlReferenceNumber": "4-1-4",
          "controlClause": "The cybersecurity requirements for contracts and agreements with third-parties must be reviewed periodically.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        }
      ]
    },
    {
      "subdomainId": "4-2",
      "subdomainName": "Cloud Computing and Hosting Cybersecurity",
      "objective": "To ensure the proper and efficient remediation of cyber risks and the implementation of cybersecurity requirements related to hosting and cloud computing as per organizational policies and procedures, and related laws and regulations. It is also to ensure the protection of the organization’s information and technology assets hosted on the cloud or processed/managed by third-parties.",
      "controls": [
        {
          "controlId": "4-2-1",
          "controlReferenceNumber": "4-2-1",
          "controlClause": "Cybersecurity requirements related to the use of hosting and cloud computing services must be defined, documented and approved.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "4-2-2",
          "controlReferenceNumber": "4-2-2",
          "controlClause": "The cybersecurity requirements related to the use of hosting and cloud computing services must be implemented.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        },
        {
          "controlId": "4-2-3",
          "controlReferenceNumber": "4-2-3",
          "controlClause": "In line with related and applicable laws and regulations, and in addition to the applicable ECC controls from main domains (1), (2), (3) and subdomain (4.1), the cybersecurity requirements related to the use of hosting and cloud computing services must include at least the following:",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": "",
          "subControls": [
            {
              "controlId": "4-2-3-1",
              "controlClause": "Classification of data prior to hosting on cloud or hosting services and returning data (in a usable format) upon service completion."
            },
            {
              "controlId": "4-2-3-2",
              "controlClause": "Separation of organization’s environments (specifically virtual servers) from other environments hosted at the cloud service provider."
            }
          ]
        },
        {
          "controlId": "4-2-4",
          "controlReferenceNumber": "4-2-4",
          "controlClause": "The cybersecurity requirements related to the use of hosting and cloud computing services must be reviewed periodically.",
          "controlType": "Mandatory",
          "complianceLevel": "",
          "remarks": "",
          "correctiveProcedures": "",
          "expectedComplianceDate": ""
        }
      ]
    }
  ]
}
   ]; 
   

// Make available in both browser and Node.js
if (typeof window !== 'undefined') {
  window.ALL_DOMAINS = ALL_DOMAINS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ALL_DOMAINS;
}