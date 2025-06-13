import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoHeadsetOutline, 
  IoAnalyticsOutline, 
  IoCallOutline, 
  IoMailOutline, 
  IoDesktopOutline, 
  IoCodeSlashOutline, 
  IoArrowForwardOutline,
  IoServerOutline
} from 'react-icons/io5';
import Button from '../Button/Button';
import './Services.css';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      icon: <IoHeadsetOutline size={48} />,
      title: "Customer Support",
      shortDesc: "24/7 multilingual support for your customers",
      description: "Our professional customer service agents provide round-the-clock support across multiple channels including voice, email, chat, and social media. We offer solutions in over 20 languages to serve your global customer base.",
      features: [
        "24/7 availability",
        "Multilingual agents",
        "Omnichannel support",
        "Quality assurance monitoring",
        "Call recording and analytics"
      ],
      color: "from-orange/80 to-orange/20"
    },
    {
      id: 1,
      icon: <IoAnalyticsOutline size={48} />,
      title: "Data Analytics",
      shortDesc: "Transform customer interactions into insights",
      description: "Our advanced analytics solutions help you understand customer behavior, identify trends, and make data-driven decisions. We analyze call patterns, customer sentiment, and interaction data to improve your business processes.",
      features: [
        "Speech analytics",
        "Customer sentiment analysis",
        "Performance dashboards",
        "Predictive analytics",
        "Custom reporting"
      ],
      color: "from-blue-500/80 to-blue-500/20"
    },
    {
      id: 2,
      icon: <IoCallOutline size={48} />,
      title: "Outbound Sales",
      shortDesc: "Proactive sales campaigns that drive revenue",
      description: "Our outbound sales teams are trained to represent your brand with professionalism and effectiveness. We develop tailored scripts, implement strategic calling plans, and continuously optimize conversion rates.",
      features: [
        "Lead qualification",
        "Appointment setting",
        "Cross-selling & upselling",
        "Win-back campaigns",
        "Sales performance tracking"
      ],
      color: "from-green-500/80 to-green-500/20"
    },
    {
      id: 3,
      icon: <IoMailOutline size={48} />,
      title: "Email Management",
      shortDesc: "Efficient handling of all customer emails",
      description: "Our email management services ensure timely and accurate responses to all customer inquiries. We implement efficient workflows, template management, and priority handling to maintain high customer satisfaction.",
      features: [
        "Response time SLAs",
        "Email categorization",
        "Template management",
        "Escalation handling",
        "Volume forecasting"
      ],
      color: "from-purple-500/80 to-purple-500/20"
    },
    {
      id: 4,
      icon: <IoDesktopOutline size={48} />,
      title: "Technical Support",
      shortDesc: "Expert technical assistance for your products",
      description: "Our technical support teams are equipped with specialized knowledge to resolve customer issues efficiently. We provide tiered support levels, from basic troubleshooting to advanced technical problem-solving.",
      features: [
        "Tiered support structure",
        "Knowledge base management",
        "Remote assistance tools",
        "Technical documentation",
        "Root cause analysis"
      ],
      color: "from-red-500/80 to-red-500/20"
    },
    {
      id: 5,
      icon: <IoCodeSlashOutline size={48} />,
      title: "Software Development",
      shortDesc: "Custom software solutions for BPO needs",
      description: "Our in-house development team creates custom software solutions to enhance your BPO operations. From CRM integrations to specialized call center applications, we develop tools that streamline your business processes.",
      features: [
        "Custom CRM development",
        "API integrations",
        "Workflow automation",
        "Dashboard development",
        "Mobile applications"
      ],
      color: "from-cyan-500/80 to-cyan-500/20"
    },
    {
      id: 6,
      icon: <IoServerOutline size={48} />,
      title: "Back Office Processing",
      shortDesc: "Streamlined back-office operations",
      description: "Our back-office processing services handle your administrative tasks with accuracy and efficiency. We manage data entry, order processing, document management, and other critical administrative functions.",
      features: [
        "Data entry & verification",
        "Order processing",
        "Document management",
        "Claims processing",
        "Form validation"
      ],
      color: "from-amber-500/80 to-amber-500/20"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className="services-section py-20 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 services-bg-pattern"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1b] via-[#0d1b38]/95 to-[#080d1b] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-orange uppercase text-sm tracking-[6px] mb-2"
          >
            What We Offer
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="services-gradient-text">Services</span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-orange mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-white/70 max-w-3xl mx-auto"
          >
            Comprehensive BPO solutions tailored to elevate your customer experience and streamline your business operations.
          </motion.p>
        </div>

        {/* Services Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`service-card ${activeService === service.id ? 'active' : ''}`}
              onClick={() => setActiveService(service.id)}
            >
              <div className={`service-card-inner bg-gradient-to-br ${service.color}`}>
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mt-4 mb-2">{service.title}</h3>
                <p className="text-sm text-white/70">{service.shortDesc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={activeService}
          className="service-detail-container mb-16"
        >
          {services.map((service) => (
            service.id === activeService && (
              <div 
                key={service.id}
                className="service-detail-card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className={`service-detail-icon bg-gradient-to-br ${service.color}`}>
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold mt-6 mb-4">{service.title}</h3>
                    <p className="text-white/80 mb-6">{service.description}</p>
                    <Button 
                      variant="primary"
                      href="#contact"
                      showIcon
                    >
                      Get Started
                    </Button>
                  </div>
                  <div className="service-features">
                    <h4 className="text-xl font-semibold mb-6 flex items-center">
                      <span className="h-1 w-6 bg-orange mr-3"></span>
                      Key Features
                    </h4>
                    <ul className="space-y-4">
                      {service.features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="flex items-start"
                        >
                          <span className="text-orange mr-3 mt-1">
                            <IoArrowForwardOutline />
                          </span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          ))}
        </motion.div>

        {/* Service Process */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold text-center mb-12"
          >
            Our Service Process
          </motion.h3>

          <div className="service-process">
            {["Discovery", "Strategy", "Implementation", "Optimization"].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="process-step"
              >
                <div className="process-number">{index + 1}</div>
                <h4 className="text-xl font-semibold mb-2">{step}</h4>
                <p className="text-white/70">
                  {index === 0 && "We analyze your business needs and identify key areas for improvement."}
                  {index === 1 && "We develop a tailored strategy to address your specific requirements."}
                  {index === 2 && "Our teams execute the plan with precision and attention to detail."}
                  {index === 3 && "We continuously refine our approach based on performance data."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div 
          className="text-center service-cta p-10 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Elevate Your Customer Experience?</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Partner with BaliTech for comprehensive BPO solutions that drive efficiency and customer satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="primary" 
              href="#contact"
              showIcon
            >
              Request a Free Consultation
            </Button>
            <Button 
              variant="secondary" 
              href="#about"
              showIcon
            >
              Learn About Our Approach
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
