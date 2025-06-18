import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAddOutline, IoRemoveOutline, IoHelpCircleOutline } from 'react-icons/io5';
import Button from '../Button/Button';
import './FAQ.css';

const FAQ = () => {
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What industries does BaliTech primarily serve?",
      answer: "BaliTech specializes in serving various industries including technology, e-commerce, financial services, healthcare, travel & hospitality, telecommunications, and retail. Our solutions are adaptable to the specific needs of each industry, ensuring optimal customer experiences across different sectors."
    },
    {
      id: 2,
      question: "How do you ensure quality control in your call centers?",
      answer: "We implement a comprehensive quality assurance framework that includes regular call monitoring, performance analytics, customer satisfaction surveys, and agent training programs. Our dedicated QA team evaluates interactions based on predefined metrics and provides continuous feedback to our agents for improvement."
    },
    {
      id: 3,
      question: "What languages do your agents support?",
      answer: "Our multilingual agents provide support in over 20 languages including English, Spanish, French, German, Mandarin, Japanese, Arabic, Portuguese, Italian, Dutch, and many more. We can also scale our language capabilities based on your specific requirements."
    },
    {
      id: 4,
      question: "How do you handle data security and compliance?",
      answer: "BaliTech maintains strict data security protocols compliant with international standards including GDPR, HIPAA, PCI-DSS, and ISO 27001. We implement end-to-end encryption, secure access controls, regular security audits, and comprehensive staff training to ensure the highest level of data protection for our clients."
    },
    {
      id: 5,
      question: "Can you scale operations during peak seasons?",
      answer: "Yes, our flexible staffing model allows us to scale operations up or down based on your business needs. We maintain a pool of trained professionals who can be quickly deployed during peak seasons or special campaigns to ensure consistent service quality even during high-volume periods."
    },
    {
      id: 6,
      question: "What technology platforms do you use for customer support?",
      answer: "We utilize a range of advanced technology platforms including Zendesk, Salesforce, Freshdesk, Genesys, Five9, and many others. We can also integrate with your existing CRM and support systems or recommend solutions that best fit your business requirements."
    },
    {
      id: 7,
      question: "How do you measure customer satisfaction?",
      answer: "We employ multiple metrics to measure customer satisfaction including CSAT scores, Net Promoter Score (NPS), Customer Effort Score (CES), First Contact Resolution rates, and qualitative feedback analysis. We provide regular reports with actionable insights to continuously improve customer experience."
    },
    {
      id: 8,
      question: "What is your typical onboarding process for new clients?",
      answer: "Our onboarding process typically includes discovery sessions, requirements analysis, solution design, team training, technology integration, pilot testing, and full-scale implementation. The entire process is tailored to your specific needs and can take anywhere from 2-8 weeks depending on the complexity of your requirements."
    }
  ];

  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState([]);

  // Toggle FAQ item
  const toggleItem = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  // Check if an item is open
  const isOpen = (id) => openItems.includes(id);

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="faq" className="faq-section py-20 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 faq-bg-pattern"></div>
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
            Get Answers
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked <span className="faq-gradient-text">Questions</span>
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
            Find answers to common questions about our BPO services and how we can help your business.
          </motion.p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="faq-glow-wrapper">
            <motion.div 
              className="faq-list"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className={`faq-item ${isOpen(faq.id) ? 'active' : ''}`}
                >
                  <button 
                    className="faq-question"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">
                      {isOpen(faq.id) ? <IoRemoveOutline size={24} /> : <IoAddOutline size={24} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen(faq.id) && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Additional Support Section */}
        <motion.div 
          className="faq-support-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-navy/30 rounded-xl p-8 border border-orange/10 relative overflow-hidden faq-support-card">
              <div className="faq-card-glow"></div>
              <div className="text-orange mb-4">
                <IoHelpCircleOutline size={48} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Still Have Questions?</h3>
              <p className="text-white/70 mb-6">
                Can't find the answer you're looking for? Our team is ready to help you with any specific inquiries about our services.
              </p>
              <Button 
                variant="primary"
                href="#contact"
                showIcon
              >
                Contact Our Team
              </Button>
            </div>
            
            <div className="md:w-1/2 bg-navy/30 rounded-xl p-8 border border-orange/10 relative overflow-hidden faq-support-card">
              <div className="faq-card-glow"></div>
              <div className="text-orange mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.25 5v5.5H4.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 .75-.75V5a.75.75 0 0 0-1.5 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">24/7 Customer Support</h3>
              <p className="text-white/70 mb-6">
                Our customer support team is available around the clock to address any urgent issues or inquiries.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/80">
                  <span className="w-6 text-orange">📞</span>
                  <span>+92 3322173140</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="w-6 text-orange">✉️</span>
                  <span>info@balitech.org</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 