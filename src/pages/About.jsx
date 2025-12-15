import profileImg from "../assets/profile.jpg"; 

export default function About() {
  return (
    <section className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1b2430] to-[#020617] px-4 py-12 text-white">
      
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT - IMAGE */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={profileImg}
              alt="Purushottam Suresh Kapsikar"
              className="w-72 h-72 object-cover rounded-2xl border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* RIGHT - CONTENT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Hi, I’m{" "}
            <span className="text-orange-500">
              Purushottam Suresh Kapsikar
            </span>
          </h1>

          <p className="text-gray-300 leading-relaxed mb-4">
            I am a passionate <span className="text-white font-medium">Web Developer</span> 
            with a <span className="text-white font-medium">BE in Computer Science</span>.
            I specialize in building modern, scalable, and user-friendly web applications.
          </p>

          <p className="text-gray-300 leading-relaxed mb-6">
            I am dedicated to understanding your project requirements, solving real-world
            problems, and delivering clean, efficient solutions that help your business grow.
          </p>

          {/* SKILLS */}
          <h3 className="text-lg font-semibold mb-3 text-orange-400">
            Technical Skills
          </h3>

          <div className="flex flex-wrap gap-3 mb-6">
            {[
              "Python",
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Redux",
              "Django",
              "Appwrite",
              "MySQL",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 rounded-full text-sm bg-white/10 border border-white/10 hover:bg-orange-500/20 transition"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA */}
          <p className="text-gray-400 text-sm">
            💡 Ready to help you build, improve, or fix your project with quality and dedication.
          </p>
        </div>
      </div>
    </section>
  );
}
