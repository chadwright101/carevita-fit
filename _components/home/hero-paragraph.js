import data from "@/_data/general-data.json";

const {
  homePage: {
    hero: { paragraph },
  },
} = data;

const HeroParagraph = () => {
  return (
    <div className="hero-section__hero-text">
      <h2 className="white-text">{paragraph[0]}</h2>
      <h2 className="white-text">{paragraph[1]}</h2>
    </div>
  );
};

export default HeroParagraph;
