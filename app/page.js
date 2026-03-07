"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

function useAnimateOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const [openDetails, setOpenDetails] = useState(new Set());
  useAnimateOnScroll();

  const toggleDetail = (id) => {
    setOpenDetails((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <section id="hero" className="hero-split">
          <div
            className="hero-bg"
            style={{ backgroundImage: "url('/images/header_background_image.png')" }}
          />
          <div className="container hero-inner">
            <div className="hero-content">
              <div className="hero-top">
                <h1 className="hero-title">Dr. Sahi Psychology & Wellness</h1>
                <p className="hero-subtitle">Supporting Minds. Strengthening Lives.</p>
                <p className="hero-tags">
                  Psychological Care · Emotional Wellbeing · Counselling · Corporate Wellness
                </p>
              </div>
              <div className="hero-bottom">
                <div className="hero-intro">
                  <p className="hero-quote">
                    <em>&quot;It&apos;s okay to pause. It&apos;s okay to reach out.&quot;</em>
                  </p>
                </div>
                <a href="#contact" className="btn primary hero-cta">
                  Begin a Conversation
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <div className="about-split">
              <div className="about-image" data-animate="fade-up">
                <img src="/images/sahi_image.png" alt="Dr. Sahithyaa Raghu" />
              </div>
              <div className="about-copy" data-animate="fade-up">
                <p className="eyebrow">Who I Am & How I Work</p>
                <h2>Dr. Sahithyaa Raghu</h2>
                <p><strong>Psychologist | RCI-Licensed Therapist</strong></p>
                <p>
                  For over 17 years, I have worked with individuals, children, families, and
                  professionals navigating emotional pain, uncertainty, and life transitions.
                </p>
                <p>
                  I understand that reaching out for support is not always easy. Many people
                  arrive with hesitation, questions, or simply a quiet hope that things can feel
                  different.
                </p>
                <p>
                  This space is not about being judged or analysed.
                  <br />
                  It is about being heard with patience, understood with respect, and supported
                  gently at a pace that feels right for you.
                </p>
                <p>
                  My work is grounded in evidence-based psychology and trauma-informed care, but
                  at its heart, it is deeply human. I believe healing begins when people feel
                  emotionally safe enough to be honest, vulnerable, and real.
                </p>
                <p>
                  You do not need to have everything figured out before beginning.
                  <br />
                  We can start wherever you are.
                </p>
                <div className="qualifications">
                  <p><strong>Professional background :</strong></p>
                  <p>
                    Doctorate in Psychology • Doctorate in Counselling and Organizational
                    Behaviour. MSc Counselling & Psychotherapy • MBA (HR) • MSW • LLB • RCI
                    License . Human Rights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-header" data-animate="fade-up">
              <p className="section-kicker">How I can support you</p>
              <h2 className="section-lead">
                You are welcome here—just as you are. If something feels heavy, we don&apos;t
                have to rush it.
              </h2>
            </div>

            <div className="services-grid">
              <ServiceCard
                id="individual"
                openDetails={openDetails}
                toggleDetail={toggleDetail}
                imgSrc="/images/services/indivudual_conselling.png"
                imgAlt="Individual counselling"
                title="Individual Counselling & Psychotherapy (Adults)"
                teaser="Individual psychotherapy provides a confidential, structured, and reflective space to explore emotional difficulties, behavioural patterns, and life transitions."
                detail={<IndividualDetail />}
              />
              <ServiceCard
                id="child"
                openDetails={openDetails}
                toggleDetail={toggleDetail}
                imgSrc="/images/services/child.png"
                imgAlt="Child and adolescent psychological support"
                title="Child & Adolescent Psychological Support"
                teaser="This service focuses on emotional development, behavioural stabilisation, and resilience building in children and adolescents."
                detail={<ChildDetail />}
              />
              <ServiceCard
                id="couple"
                openDetails={openDetails}
                toggleDetail={toggleDetail}
                imgSrc="/images/services/couples.jpeg"
                imgAlt="Couple and family counselling"
                title="Couple & Family Counselling"
                teaser="A structured therapeutic process designed to address relational conflict, communication barriers, and emotional disconnect."
                detail={<CoupleDetail />}
              />
              <ServiceCard
                id="assessments"
                openDetails={openDetails}
                toggleDetail={toggleDetail}
                imgSrc="/images/services/pysocology.jpeg"
                imgAlt="Psychological assessments"
                title="Psychological Assessments"
                teaser="Assessments are conducted when structured evaluation is required for diagnostic clarity or intervention planning."
                detail={<AssessmentsDetail />}
              />
              <ServiceCard
                id="career"
                openDetails={openDetails}
                toggleDetail={toggleDetail}
                imgSrc="/images/services/carerr_conselling.jpeg"
                imgAlt="Career counselling and academic guidance"
                title="Career Counselling & Academic Guidance"
                teaser="Psychology-based career guidance for students and professionals navigating career decisions."
                detail={<CareerDetail />}
              />
              <ServiceCard
                id="corporate"
                openDetails={openDetails}
                toggleDetail={toggleDetail}
                imgSrc="/images/services/coporate.jpeg"
                imgAlt="Corporate mental health and leadership"
                title="Corporate Mental Health & Leadership Programs"
                teaser="Designed for organisations seeking to integrate mental health into workplace culture."
                detail={<CorporateDetail />}
              />
              <ServiceCard
                id="online"
                openDetails={openDetails}
                toggleDetail={toggleDetail}
                imgSrc="/images/services/online_across.jfif"
                imgAlt="Online therapy – pan-India access"
                title="Online Therapy (Pan-India Access)"
                teaser="Online therapy ensures accessible mental health support regardless of location."
                detail={<OnlineDetail />}
              />
            </div>

            <p className="services-closing" data-animate="fade-up">
              You don&apos;t have to manage everything alone. You are allowed to seek care, and
              to be met with kindness when you do.
            </p>
            <div className="section-cta" data-animate="fade-up">
              <a href="#contact" className="btn primary">
                Begin a Conversation
              </a>
            </div>
          </div>
        </section>

        <section id="testimonials" className="section testimonials-section">
          <div className="container">
            <div className="section-header" data-animate="fade-up">
              <p className="eyebrow">Kind words</p>
              <h2>People who have walked this path</h2>
              <p className="section-subtitle">
                Stories of healing and growth from those who have found support here.
              </p>
            </div>
            <div className="testimonials-grid">
              <blockquote className="testimonial-card" data-animate="fade-up">
                <p className="testimonial-text">
                  &quot;I came in feeling completely overwhelmed. Dr. Sahithyaa created a space
                  where I could finally breathe and be honest—without judgment. I left each
                  session feeling a little lighter.&quot;
                </p>
                <footer className="testimonial-author">— Anonymous</footer>
              </blockquote>
              <blockquote className="testimonial-card" data-animate="fade-up">
                <p className="testimonial-text">
                  &quot;The support for our family was gentle and practical. We learned to listen
                  to each other in ways we hadn&apos;t before. Truly transformative.&quot;
                </p>
                <footer className="testimonial-author">— Parent</footer>
              </blockquote>
              <blockquote className="testimonial-card" data-animate="fade-up">
                <p className="testimonial-text">
                  &quot;A calm, respectful space where I felt safe to explore what was really
                  going on. No pressure, no rush—just genuine care.&quot;
                </p>
                <footer className="testimonial-author">— Professional</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section how-section">
          <div className="container">
            <div className="section-header" data-animate="fade-up">
              <p className="section-kicker">What Counselling is Like Here</p>
            </div>
            <div className="how-grid">
              <div className="how-card" data-animate="fade-up">
                <h3>We begin with listening</h3>
                <p>You decide what to share and when. Silence is welcome too.</p>
              </div>
              <div className="how-card" data-animate="fade-up">
                <h3>We understand together</h3>
                <p>There is no pressure to &quot;fix&quot; things quickly or perform progress.</p>
              </div>
              <div className="how-card" data-animate="fade-up">
                <h3>We work collaboratively</h3>
                <p>You are always part of the decisions. Your voice matters.</p>
              </div>
              <div className="how-card" data-animate="fade-up">
                <h3>We pause and close thoughtfully</h3>
                <p>Counselling is not endless. We review, integrate, and close when you feel ready.</p>
              </div>
            </div>
            <p className="how-note" data-animate="fade-up">
              You remain in control throughout.
            </p>
          </div>
        </section>

        <section className="section safety-section">
          <div className="container" data-animate="fade-up">
            <div className="safety-wrap">
              <p className="safety-eyebrow">Our commitment</p>
              <h2 className="safety-title">
                A Note on Safety, Ethics & Confidentiality
              </h2>
              <div className="safety-grid">
                <div className="safety-item">
                  <span className="safety-check" aria-hidden="true">✓</span>
                  <span>Your privacy and dignity are respected at all times.</span>
                </div>
                <div className="safety-item">
                  <span className="safety-check" aria-hidden="true">✓</span>
                  <span>Sessions are confidential.</span>
                </div>
                <div className="safety-item">
                  <span className="safety-check" aria-hidden="true">✓</span>
                  <span>
                    Information is never shared without consent, except in rare, legally
                    required situations.
                  </span>
                </div>
                <div className="safety-item">
                  <span className="safety-check" aria-hidden="true">✓</span>
                  <span>This is a safe, inclusive, and non-judgmental space.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="outreach" className="section outreach-section">
          <div className="container">
            <div className="outreach-split">
              <div className="outreach-copy" data-animate="fade-up">
                <p className="eyebrow outreach-heading">
                  Extending Care Beyond the Clinic
                </p>
                <p>Mental health care should not be a privilege. Alongside clinical practice, this work extends into communities through <strong>SANKALPAM Mind &amp; Wellness Foundation</strong>, with a focus on promoting emotional wellbeing and making psychological support accessible, especially for underserved and rural populations.</p>
                <p>This initiative works toward:</p>
                <ul>
                  <li>Promoting mental health awareness and emotional wellbeing in communities</li>
                  <li>Supporting children, adolescents, families, and vulnerable individuals</li>
                  <li>Creating awareness on suicide prevention, addiction, and digital wellbeing</li>
                  <li>Reducing stigma and improving access to psychological support</li>
                  <li>Encouraging early identification and timely support</li>
                </ul>
                <p>To check the SANKALPAM website — <a href="https:www.//sankalpammind.org" target="_blank" rel="noopener noreferrer">wwwsankalpammind.org</a></p>
                <p className="outreach-subheading">Community Volunteer Initiative</p>
                <p>Individuals who are passionate about supporting mental health in their own villages or rural areas are welcome to join as volunteers. Volunteers serve as important bridges within their communities by spreading awareness, offering empathetic support, and helping individuals connect with appropriate professional care.</p>
                <p>To ensure volunteers feel confident and supported, free Train-the-Trainer sessions are provided. These programs equip volunteers with essential skills in emotional support and Psychological First Aid, enabling them to offer safe, responsible, and compassionate support within their communities.</p>
              </div>
              <div
                className="outreach-image"
                data-animate="fade-up"
                style={{
                  backgroundImage: "url('/images/services/volunterr.webp')",
                }}
                title="Community mental health outreach"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="section-header" data-animate="fade-up">
              <p className="eyebrow">Contact</p>
              <h2>You are welcome here.</h2>
              <p className="section-subtitle">
                Get in touch to begin or ask a question. In-person (Chennai),
                online, or by appointment.
              </p>
            </div>
            <div className="contact-panel" data-animate="fade-up">
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Phone</strong>
                  <a href="tel:+919962881006">9962881006</a>
                </div>
                <div className="contact-item">
                  <strong>Email</strong>
                  <a href="mailto:drsahipsy@gmail.com">drsahipsy@gmail.com</a>
                </div>
                <div className="contact-item">
                  <strong>Location</strong>
                  <p>
                    Offline: Chennai
                    <br />
                    Online Consultations: Across Locations
                  </p>
                </div>
                <div className="contact-item">
                  <strong>Sessions</strong>
                  <p>
                    By appointment only. In-person (Chennai), online counselling, or
                    flexible scheduling where possible.
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer-inner">
            <p>© {new Date().getFullYear()} Dr. Sahi Psychology & Wellness. All rights reserved.</p>
            <p className="footer-micro">
              This practice is grounded in ethics, empathy, and respect for individual dignity.
            </p>
            <p className="footer-note">
              This website is not a crisis service. If you are in immediate danger or need urgent
              support, please contact your local emergency number or crisis helpline.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function ServiceCard({ id, openDetails, toggleDetail, imgSrc, imgAlt, title, teaser, detail }) {
  const isOpen = openDetails.has(id);
  return (
    <article
      className="service-card service-card-expandable service-card-inline"
      data-animate="fade-up"
    >
      <div className="service-card-img" title={title}>
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div className="service-card-body">
        <h3>{title}</h3>
        <p className="service-teaser">{teaser}</p>
        <div
          className={`service-detail ${isOpen ? "is-open" : ""}`}
          id={`${id}-detail`}
          aria-hidden={!isOpen}
        >
          {detail}
        </div>
        <button
          type="button"
          className="service-read-more"
          aria-expanded={isOpen}
          aria-controls={`${id}-detail`}
          onClick={() => toggleDetail(id)}
        >
          {isOpen ? "Show less" : "Read more"}
        </button>
      </div>
    </article>
  );
}

function IndividualDetail() {
  return (
    <>
      <p><strong>Areas Commonly Addressed</strong></p>
      <p><strong>Emotional & Mood Concerns</strong></p>
      <ul>
        <li>Generalised anxiety and persistent worry</li>
        <li>Panic symptoms</li>
        <li>Depressive symptoms</li>
        <li>Emotional numbness</li>
        <li>Mood instability</li>
        <li>Irritability and overwhelm</li>
      </ul>
      <p><strong>Stress & Life Transitions</strong></p>
      <ul>
        <li>Career pressure</li>
        <li>Burnout</li>
        <li>Relocation adjustment</li>
        <li>Marriage / separation</li>
        <li>Parenting stress</li>
        <li>Identity shifts</li>
      </ul>
      <p><strong>Trauma & Emotional Processing</strong></p>
      <ul>
        <li>Unresolved past experiences</li>
        <li>Relational trauma</li>
        <li>Chronic stress patterns</li>
        <li>Emotional triggers</li>
      </ul>
      <p><strong>Self & Interpersonal Patterns</strong></p>
      <ul>
        <li>Low self-esteem</li>
        <li>People-pleasing tendencies</li>
        <li>Boundary difficulties</li>
        <li>Fear of rejection</li>
        <li>Attachment-related patterns</li>
      </ul>
      <p><strong>Therapeutic Modalities Integrated</strong></p>
      <ul>
        <li>Cognitive Behavioural Therapy (CBT)</li>
        <li>Emotion regulation frameworks</li>
        <li>Trauma-sensitive interventions</li>
        <li>Insight-oriented psychotherapy</li>
        <li>Strength-based approaches</li>
        <li>Mindfulness-based strategies</li>
      </ul>
      <p><strong>Structure of Therapy</strong></p>
      <ul>
        <li>Initial assessment (1–2 sessions)</li>
        <li>Goal clarification</li>
        <li>Structured therapeutic plan</li>
        <li>Periodic progress review</li>
        <li>Termination and relapse-prevention planning</li>
      </ul>
      <p><strong>Outcomes</strong></p>
      <ul>
        <li>Improved emotional regulation</li>
        <li>Healthier cognitive restructuring</li>
        <li>Increased resilience</li>
        <li>Greater self-awareness</li>
        <li>Behavioural change aligned with values</li>
      </ul>
    </>
  );
}

function ChildDetail() {
  return (
    <>
      <p><strong>Presenting Concerns</strong></p>
      <p><strong>Academic & School Issues</strong></p>
      <ul>
        <li>Exam anxiety</li>
        <li>School refusal</li>
        <li>Performance pressure</li>
        <li>Concentration concerns</li>
      </ul>
      <p><strong>Emotional Regulation</strong></p>
      <ul>
        <li>Frequent emotional outbursts</li>
        <li>Withdrawal</li>
        <li>Anxiety symptoms</li>
        <li>Fear-based behaviours</li>
      </ul>
      <p><strong>Behavioural Concerns</strong></p>
      <ul>
        <li>Impulsivity</li>
        <li>Defiance</li>
        <li>Social skill deficits</li>
        <li>Peer conflict</li>
      </ul>
      <p><strong>Developmental Adjustments</strong></p>
      <ul>
        <li>Transition to new schools</li>
        <li>Parental separation</li>
        <li>Grief</li>
        <li>Sibling rivalry</li>
      </ul>
      <p><strong>Intervention Approach</strong></p>
      <ul>
        <li>Developmentally appropriate counselling</li>
        <li>Play-informed techniques (for younger children)</li>
        <li>Emotional literacy training</li>
        <li>Behaviour modification strategies</li>
        <li>Parent counselling sessions</li>
        <li>DBT-informed emotional regulation skills (age-adapted)</li>
      </ul>
      <p><strong>Parent Involvement</strong></p>
      <p>Parental sessions are incorporated for: Psychoeducation; Behavioural strategy implementation; Consistency across home and school.</p>
      <p><strong>Outcomes</strong></p>
      <ul>
        <li>Improved emotional articulation</li>
        <li>Enhanced coping skills</li>
        <li>Behavioural stabilisation</li>
        <li>Strengthened parent-child relationship</li>
      </ul>
    </>
  );
}

function CoupleDetail() {
  return (
    <>
      <p><strong>Common Presenting Issues</strong></p>
      <ul>
        <li>Chronic conflict patterns</li>
        <li>Emotional withdrawal</li>
        <li>Parenting disagreements</li>
        <li>Financial stress impact</li>
        <li>Work-life imbalance</li>
        <li>Pre-marital concerns</li>
        <li>Extended family boundary conflicts</li>
      </ul>
      <p><strong>Intervention Focus</strong></p>
      <ul>
        <li>Communication restructuring</li>
        <li>Conflict de-escalation techniques</li>
        <li>Emotional validation training</li>
        <li>Boundary setting frameworks</li>
        <li>Role clarity exercises</li>
        <li>Shared goal development</li>
      </ul>
      <p><strong>Special Focus Areas</strong></p>
      <ul>
        <li>Dual-income household strain</li>
        <li>Gendered role expectations</li>
        <li>Caregiver burnout</li>
        <li>Parenting alignment</li>
      </ul>
      <p><strong>Outcomes</strong></p>
      <ul>
        <li>Reduced reactive conflict</li>
        <li>Increased emotional attunement</li>
        <li>Clearer expectations</li>
        <li>Strengthened relational trust</li>
      </ul>
    </>
  );
}

function AssessmentsDetail() {
  return (
    <>
      <p><strong>Types of Assessments</strong></p>
      <p><strong>Emotional & Behavioural Assessment</strong></p>
      <ul>
        <li>Anxiety profiling</li>
        <li>Mood symptom mapping</li>
        <li>Emotional functioning evaluation</li>
      </ul>
      <p><strong>Learning & Developmental Assessment</strong></p>
      <ul>
        <li>Academic concerns</li>
        <li>Attention screening</li>
        <li>Cognitive profiling (when required)</li>
      </ul>
      <p><strong>Personality & Adjustment Profiling</strong></p>
      <ul>
        <li>Personality traits analysis</li>
        <li>Coping style evaluation</li>
        <li>Relational pattern mapping</li>
      </ul>
      <p><strong>Career Assessment</strong></p>
      <ul>
        <li>Interest inventories</li>
        <li>Aptitude evaluation</li>
        <li>Personality-career alignment tools</li>
      </ul>
      <p><strong>Process</strong></p>
      <ul>
        <li>Intake interview</li>
        <li>Standardised assessment tools</li>
        <li>Scoring & interpretation</li>
        <li>Comprehensive feedback session</li>
        <li>Written report (if required)</li>
      </ul>
      <p><strong>Outcomes</strong></p>
      <ul>
        <li>Clear diagnostic understanding</li>
        <li>Structured intervention roadmap</li>
        <li>Academic or career direction clarity</li>
      </ul>
    </>
  );
}

function CareerDetail() {
  return (
    <>
      <p><strong>Suitable For</strong></p>
      <ul>
        <li>Grade 8–12 students</li>
        <li>Undergraduate students</li>
        <li>Early-career professionals</li>
        <li>Mid-career transition seekers</li>
      </ul>
      <p><strong>Components</strong></p>
      <ul>
        <li>Interest and aptitude testing</li>
        <li>Strength mapping</li>
        <li>Personality-career compatibility</li>
        <li>Career pathway exploration</li>
        <li>Decision-making skill building</li>
        <li>Academic stream selection guidance</li>
      </ul>
      <p><strong>Outcomes</strong></p>
      <ul>
        <li>Reduced career confusion</li>
        <li>Increased clarity</li>
        <li>Structured planning</li>
        <li>Long-term alignment</li>
      </ul>
    </>
  );
}

function CorporateDetail() {
  return (
    <>
      <p><strong>Services Include</strong></p>
      <p><strong>Employee Support</strong></p>
      <ul>
        <li>Individual employee counselling</li>
        <li>Stress management workshops</li>
        <li>Burnout prevention modules</li>
      </ul>
      <p><strong>Leadership Development</strong></p>
      <ul>
        <li>Psychological safety frameworks</li>
        <li>Emotionally intelligent leadership training</li>
        <li>Conflict management workshops</li>
      </ul>
      <p><strong>Organisational Consulting</strong></p>
      <ul>
        <li>Mental health policy guidance</li>
        <li>Workplace wellbeing audits</li>
        <li>DEI-aligned mental health integration</li>
      </ul>
      <p><strong>Delivery Formats</strong></p>
      <ul>
        <li>On-site workshops</li>
        <li>Virtual webinars</li>
        <li>Hybrid training modules</li>
        <li>Leadership retreats</li>
      </ul>
      <p><strong>Outcomes</strong></p>
      <ul>
        <li>Reduced absenteeism</li>
        <li>Improved engagement</li>
        <li>Enhanced leadership sensitivity</li>
        <li>Stronger team trust</li>
      </ul>
    </>
  );
}

function OnlineDetail() {
  return (
    <>
      <p><strong>Suitable For</strong></p>
      <ul>
        <li>Working professionals</li>
        <li>Individuals in rural areas</li>
        <li>NRIs</li>
        <li>Clients preferring privacy</li>
      </ul>
      <p>Sessions are structured and conducted through secure platforms, maintaining full confidentiality.</p>
    </>
  );
}
