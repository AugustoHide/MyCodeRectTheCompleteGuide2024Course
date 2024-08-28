import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import cityImg from "../assets/city.jpg";
import heroImg from "../assets/hero.png";

/**
 * aula 508: scroll-based animations
 *  Para fazer animações baseadas no scroll, precisamos primeiramente pegar coordenadas do scroll. Para isso usamos o hook do framer-motion, useScroll. Ele pode retornar várias informações sobre o scroll, mas neste caso só decidimos pegar a informação da quantidade de scroll que usuário fez, chamada de scrollY
 *  Em seguida, para fazer com que animações ocorram de forma suave e progressiva conforme fazemos o scroll, precisamos usar o hook useTransform. Basicamente este hook transforma uma sequencia de número em outras, para que estes tes número sirvam para por nas definições de animações.
 *  Assim, podemos pegar esse valores adapados para definições de animações e aplicá-las à elementos motion.
 *  Importante ressaltar que usamos o style, neste caso, pois ele não re execu o elemento quando há alguma mudança. Mas, como está dentro de um elemento do motion, as alterações nos parâmetros das animações acontecem sem reexecutar os elemtos.
 */

export default function WelcomePage() {
  const { scrollY } = useScroll();
  const yCity = useTransform(scrollY, [0, 200], [0, -100]);
  const yHero = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityHero = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);
  const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);
  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
  const opacityCity = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [1, 0.5, 0.5, 0]
  );

  return (
    <>
      <header id="welcome-header">
        <motion.div
          id="welcome-header-content"
          style={{ scale: scaleText, y: yText }}
        >
          <h1>Ready for a challenge?</h1>
          <Link id="cta-link" to="/challenges">
            Get Started
          </Link>
        </motion.div>
        <motion.img
          style={{ opacity: opacityCity, y: yCity }}
          src={cityImg}
          alt="A city skyline touched by sunlight"
          id="city-image"
        />
        <motion.img
          style={{ y: yHero, opacity: opacityHero }}
          src={heroImg}
          alt="A superhero wearing a cape"
          id="hero-image"
        />
      </header>
      <main id="welcome-content">
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            “I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!” - Alex
            P.
          </p>
          {/* You can add more testimonials or even a carousel for multiple testimonials */}
        </section>
      </main>
    </>
  );
}
