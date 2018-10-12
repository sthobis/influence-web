import { css, cx } from "emotion";
import produce from "immer";
import set from "lodash/set";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FaSave } from "react-icons/fa";
import Localize from "./Localize";
import PremiumNotice from "./PremiumNotice";
import TagsFilter from "./TagsFilter";

class InfluencerEdit extends Component {
  state = {
    influencer: this.props.influencer
  };

  handleChange = (key, value) => {
    this.setState(
      produce(draft => {
        set(draft, key, value);
      })
    );
  };

  save = () => {
    const { save } = this.props;
    const { influencer } = this.state;
    save(influencer);
  };

  render() {
    const { influencer } = this.state;
    return (
      <Localize selector="components.influencerEdit">
        {localized => (
          <div className={styles.root}>
            <section className={styles.section}>
              <h2 className={styles.title}>Tags</h2>
              <div className={cx(styles.field, styles.fullWidth)}>
                <TagsFilter
                  alternateStyle
                  tags={influencer.tags}
                  setFilter={(key, value) =>
                    this.handleChange("influencer.tags", value)
                  }
                />
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.title}>{localized[0]}</h2>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pricing-post">
                    {localized[1]}
                  </label>
                  <input
                    type="number"
                    id="pricing-post"
                    className={styles.input}
                    placeholder={localized[2]}
                    value={influencer.endorsePricing.post}
                    onChange={e =>
                      this.handleChange(
                        "influencer.endorsePricing.post",
                        e.target.value
                          ? parseInt(e.target.value)
                          : e.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pricing-story">
                    {localized[3]}
                  </label>
                  <input
                    type="number"
                    id="pricing-story"
                    className={styles.input}
                    placeholder={localized[2]}
                    value={influencer.endorsePricing.story}
                    onChange={e =>
                      this.handleChange(
                        "influencer.endorsePricing.story",
                        e.target.value
                          ? parseInt(e.target.value)
                          : e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.title}>Contact</h2>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-email">
                    email
                  </label>
                  <input
                    type="text"
                    id="contact-email"
                    className={styles.input}
                    placeholder="Email"
                    value={influencer.contact.email}
                    onChange={e =>
                      this.handleChange(
                        "influencer.contact.email",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-instagram">
                    instagram
                  </label>
                  <input
                    type="text"
                    id="contact-instagram"
                    className={styles.input}
                    placeholder="Instagram"
                    value={influencer.contact.instagram}
                    onChange={e =>
                      this.handleChange(
                        "influencer.contact.instagram",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-whatsapp">
                    whatsapp
                  </label>
                  <input
                    type="text"
                    id="contact-whatsapp"
                    className={styles.input}
                    placeholder="Whatsapp"
                    value={influencer.contact.whatsapp}
                    onChange={e =>
                      this.handleChange(
                        "influencer.contact.whatsapp",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-line">
                    line
                  </label>
                  <input
                    type="text"
                    id="contact-line"
                    className={styles.input}
                    placeholder="Line"
                    value={influencer.contact.line}
                    onChange={e =>
                      this.handleChange(
                        "influencer.contact.line",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-phone">
                    phone
                  </label>
                  <input
                    type="text"
                    id="contact-phone"
                    className={styles.input}
                    placeholder="Phone"
                    value={influencer.contact.phone}
                    onChange={e =>
                      this.handleChange(
                        "influencer.contact.phone",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </section>
            <section className={styles.section}>
              <button
                type="button"
                onClick={this.save}
                className={cx(styles.button, styles.saveButton)}
              >
                <FaSave /> {localized[4]}
              </button>
            </section>
            <section className={styles.section}>
              <PremiumNotice premiumExpiredAt={influencer.premiumExpiredAt} />
            </section>
          </div>
        )}
      </Localize>
    );
  }
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    margin: "0 0 75px 0",
    padding: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)"
  }),
  section: css({
    width: "100%",
    margin: "0 0 20px 0"
  }),
  title: css({
    margin: "0 0 15px 0"
  }),
  row: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexWrap: "wrap"
  }),
  field: css({
    position: "relative",
    display: "block",
    width: "calc((100% - 25px) / 2)",
    margin: "0 0 20px 0"
  }),
  fullWidth: css({
    width: "100%"
  }),
  label: css({
    display: "block",
    textTransform: "uppercase",
    fontSize: 14,
    color: "#181a28",
    fontWeight: 700,
    margin: "0 0 5px 0"
  }),
  input: css({
    display: "block",
    width: "100%",
    border: "none",
    borderRadius: 5,
    backgroundColor: "#f6faff",
    padding: "12px 20px",
    fontSize: 15,
    fontWeight: 400,
    "&::placeholder": {
      color: "#aaa"
    }
  }),
  button: css({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2e3040",
    border: "none",
    borderRadius: 3,
    margin: "25px 0 0 0",
    padding: "10px 20px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 18,
    "& svg": {
      marginRight: 10
    }
  }),
  saveButton: css({
    margin: "0 auto"
  })
};

InfluencerEdit.propTypes = {
  influencer: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    instagramHandle: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    followersCount: PropTypes.number.isRequired,
    endorsePricing: PropTypes.shape({
      post: PropTypes.number.isRequired,
      story: PropTypes.number.isRequired
    }).isRequired,
    contact: PropTypes.shape({
      phone: PropTypes.string.isRequired,
      whatsapp: PropTypes.string.isRequired,
      line: PropTypes.string.isRequired,
      instagram: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    biography: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    recentPhotos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likesCount: PropTypes.number.isRequired,
        repliesCount: PropTypes.number.isRequired
      })
    )
  }).isRequired,
  save: PropTypes.func.isRequired
};

export default InfluencerEdit;
