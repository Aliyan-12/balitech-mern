import React from 'react';
import { motion } from 'framer-motion';
import { IoRocketOutline, IoHeadsetOutline, IoEarthOutline, IoStatsChartOutline } from 'react-icons/io5';
import Button from '../Button/Button';
import './About.css';

const About = () => {
  // Company stats
  const stats = [
    { icon: <IoRocketOutline size={28} />, value: '12+', label: 'Years Experience' },
    { icon: <IoHeadsetOutline size={28} />, value: '500+', label: 'Dedicated Agents' },
    { icon: <IoEarthOutline size={28} />, value: '12', label: 'Global Locations' },
    { icon: <IoStatsChartOutline size={28} />, value: '98%', label: 'Client Satisfaction' },
  ];

  // Company values
  const values = [
    {
      title: 'Excellence',
      description: 'We are committed to delivering exceptional quality in every interaction and solution we provide.',
    },
    {
      title: 'Integrity',
      description: 'We uphold the highest ethical standards and transparency in all our business relationships.',
    },
    {
      title: 'Innovation',
      description: 'We continuously explore new technologies and approaches to enhance our service delivery.',
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership with our clients for mutual success.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#080d1b] text-white relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About <span className="about-gradient-text">BaliTech</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-orange mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
          <motion.p 
            className="text-lg text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            A leading Business Process Outsourcing (BPO) company providing world-class call center and customer support solutions since 2010.
          </motion.p>
        </div>

        {/* Company overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image column */}
          <motion.div 
            className="relative about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video rounded-lg overflow-hidden float-animation">
              <div className="w-full h-full bg-gradient-to-br from-navy/80 to-navy/30 p-8 flex items-center justify-center backdrop-blur-sm border border-orange/20">
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-[#121f3d] flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
                      alt="Modern call center office" 
                      className="w-full h-full object-cover opacity-70 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="font-bold text-4xl lg:text-5xl">
                        <span className="text-white">Bali</span>
                        <span className="text-orange">Tech</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-orange/90 rounded-lg py-4 px-6 shadow-lg">
              <p className="text-xl font-bold">Est. 2010</p>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold mb-6">Your Trusted BPO Partner</h3>
            <p className="text-white/80 mb-6">
              BaliTech has been a pioneer in the Business Process Outsourcing industry, delivering exceptional call center and customer experience solutions to clients worldwide. From our humble beginnings in Bali, Indonesia, we have expanded to 12 locations globally, employing over 500 dedicated professionals.
            </p>
            <p className="text-white/80 mb-6">
              Our state-of-the-art facilities and advanced technology infrastructure enable us to provide seamless, 24/7 multilingual customer support services. We specialize in creating custom solutions tailored to each client's unique requirements, from inbound customer service to technical support and outbound sales.
            </p>
            <p className="text-white/80 mb-8">
              What sets us apart is our commitment to excellence, continuous improvement, and deep understanding of our clients' industries. We don't just provide services; we build long-term partnerships focused on driving business growth and enhancing customer satisfaction.
            </p>
            <Button 
              variant="secondary" 
              href="#contact"
              showIcon
            >
              Partner With Us
            </Button>
          </motion.div>
        </div>

        {/* Stats section */}
        <div className="bg-navy/30 rounded-xl border border-orange/10 p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center about-stat-card p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-orange mb-3 flex justify-center stat-icon">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company values */}
        <div className="mb-16">
          <motion.h3 
            className="text-3xl font-semibold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-navy/20 rounded-lg p-6 border border-orange/10 hover:border-orange/30 transition-all duration-300 value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-4 text-orange value-title">{value.title}</h4>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6">Ready to Transform Your Customer Experience?</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Discover how BaliTech can help your business deliver exceptional customer service while reducing operational costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="primary" 
              href="#contact"
              showIcon
            >
              Contact Us Today
            </Button>
            <Button 
              variant="ghost" 
              href="#services"
              showIcon
            >
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
