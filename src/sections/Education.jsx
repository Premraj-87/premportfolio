/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function Education() {
  const certificates = [
    {
      title: "Web Develpopment – Ardent Computech",
      image: "/certificates/Ardent_pvt.jpg", // can be PDF thumbnail
      file: "/certificates/Ardent_pvt.pdf",  // real PDF to open in new tab
    },
    {
      title: "JavaScript Essentials – Cisco Networking Academy",
      image: "/certificates/JavaScript_Certificates.jpg",
      file: "/certificates/JavaScript_Certificates.pdf",
    },
    // {
    //   title: "Web Development – Internshala",
    //   image: "/certificates/Webdevlopment_intern.jpg",
    //   file: "/certificates/Webdevlopment_intern.pdf",
    // },
    // {
    //   title: "Web Dev with PHP – Ardent Computech",
    //   image: "/certificates/Ardent_pvt.jpg",
    //   file: "/certificates/Ardent_pvt.pdf",
    // },
  ];

  return (
    <section
      id="education"
      className="min-h-screen py-20 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-black text-gray-900 dark:text-white"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-center text-[#DAA520] mb-16">
          Education & Certificates
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* === Education Column === */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Education</h3>
            <div className="border-l-2 border-[#DAA520] pl-6 space-y-10">
              <div>
                <h4 className="text-lg font-medium">MCA – Chandigarh University</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">2024 – 2026</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                  <li>Full-Stack Development</li>
                  <li>Cloud Computing</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium">BCA – Sarla Birla University</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">2021 – 2024</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                  <li>Web & Mobile Development</li>
                  <li>Core CS Fundamentals</li>
                </ul>
              </div>

              
            </div>
          </motion.div>

          {/* === Certificates Column === */}
          <motion.div
            className="lg:w-1/2 max-h-[400px] overflow-y-auto pr-2 no-scrollbar"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-0 bg-gray-50 dark:bg-black z-10 pb-4">
              <h3 className="text-2xl font-semibold">Certificates</h3>
            </div>

            <div className="space-y-6">
              {certificates.map((cert, index) => (
                <motion.a
                  key={index}
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.96 }}
                  className="block cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                      {cert.title}
                    </h4>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
