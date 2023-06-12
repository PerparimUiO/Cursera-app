import owners1 from "./../../assets/Mario and Adrian b resized.jpg";
import owners2 from "./../../assets/Mario and Adrian A resized.jpg";

import classes from "./About.module.css";

const About = () => {
  return (
    <section className={classes.about}>
      <div className={classes.about__text}>
        <h1>About Us</h1>
        <p>
          Based in Chicago, Illinois, Little Lemon is a family owned
          Mediterranean restaurant, focused on traditional recipes served with a
          modern twist. The chefs draw inspiration from Italian, Greek, and
          Turkish culture and have a menu of 12-15 items that they rotate
          seasonally. The restaurant has a rustic and relaxed atmosphere with
          moderate prices, making it a popular place for a meal any time of the
          day. Little Lemon is owned by two Italian brothers, Mario and Adrian,
          who moved to the United States to pursue their shared dream of owning
          a restaurant. To craft the menu, Mario relies on family recipes and
          his experience as a chef in Italy. Adrian does all the marketing for
          the restaurant and led the effort to expand the menu beyond classic
          Italian to incorporate additional cuisines from the mediterranean
          region.
        </p>
      </div>
      <div className={classes.about__imgs}>
        <img
          src={owners1}
          alt="Mario and Adrian the owners of the restaurant"
        />
        <img
          src={owners2}
          alt="Mario and Adrian the owners of the restaurant"
        />
        <p>Mario and Adrian the owners of Little Lemon</p>
      </div>
    </section>
  );
};

export default About;
