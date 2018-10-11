import { css, cx } from "emotion";
import produce from "immer";
import set from "lodash/set";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FaCreditCard, FaRegMeh, FaRegSmile, FaSave } from "react-icons/fa";
import TagsFilter from "./TagsFilter";

class InfluencerEdit extends Component {
  state = {
    influencer: this.props.influencer,
    isHoveringPremium: false
  };

  handleChange = (key, value) => {
    this.setState(
      produce(draft => {
        set(draft, key, value);
      })
    );
  };

  handleMouseOver = () => {
    this.setState({ isHoveringPremium: true });
  };

  handleMouseOut = () => {
    this.setState({ isHoveringPremium: false });
  };

  save = () => {
    const { save } = this.props;
    const { influencer } = this.state;
    save(influencer);
  };

  render() {
    const { influencer, isHoveringPremium } = this.state;

    return (
      <div className={styles.root}>
        <section className={styles.section}>
          <h2 className={styles.title}>Tags</h2>
          <div className={styles.field}>
            <TagsFilter
              tags={influencer.tags}
              setFilter={(key, value) =>
                this.handleChange("influencer.tags", value)
              }
            />
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.title}>Endorse Pricing</h2>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pricing-post">
                post endorsement price
              </label>
              <input
                type="number"
                id="pricing-post"
                className={styles.input}
                placeholder="post endorsement price"
                value={influencer.endorsePricing.post}
                onChange={e =>
                  this.handleChange(
                    "influencer.endorsePricing.post",
                    e.target.value ? parseInt(e.target.value) : e.target.value
                  )
                }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pricing-story">
                story endorsement price
              </label>
              <input
                type="number"
                id="pricing-story"
                className={styles.input}
                placeholder="story endorsement price"
                value={influencer.endorsePricing.story}
                onChange={e =>
                  this.handleChange(
                    "influencer.endorsePricing.story",
                    e.target.value ? parseInt(e.target.value) : e.target.value
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
                  this.handleChange("influencer.contact.email", e.target.value)
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
                  this.handleChange("influencer.contact.line", e.target.value)
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
                  this.handleChange("influencer.contact.phone", e.target.value)
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
            <FaSave /> Save
          </button>
        </section>
        <section className={styles.section}>
          <div className={styles.premium}>
            {new Date(influencer.premiumExpiredAt) > new Date() ? (
              <>
                <p className={styles.premiumText}>
                  you are currently on{" "}
                  <Link href="/#pricing">
                    <a>premium plan</a>
                  </Link>{" "}
                  with full features activated
                </p>
                <FaRegSmile className={styles.premiumIcon} />
                <p className={styles.premiumText}>
                  thanks for making us smile!
                  <br />
                  have any suggestion or feature you would like to see?{" "}
                  <Link href="/#contact">
                    <a>let us know</a>
                  </Link>
                </p>
                <span className={styles.expiration}>
                  expires on {formatDate(influencer.premiumExpiredAt)}
                </span>
              </>
            ) : (
              <>
                <p className={styles.premiumText}>
                  you are currently on{" "}
                  <Link href="/#pricing">
                    <a>free plan</a>
                  </Link>{" "}
                  with limited features
                </p>
                {isHoveringPremium ? (
                  <FaRegSmile className={styles.premiumIcon} />
                ) : (
                  <FaRegMeh className={styles.premiumIcon} />
                )}
                <p className={styles.premiumText}>
                  upgrade to{" "}
                  <Link href="/#pricing">
                    <a
                      onMouseOver={this.handleMouseOver}
                      onMouseOut={this.handleMouseOut}
                    >
                      premium plan
                    </a>
                  </Link>{" "}
                  to get full features
                  <br />
                  you will also make us smile by doing so!
                </p>
                <button
                  className={styles.button}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}
                >
                  <FaCreditCard /> Upgrade
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    );
  }
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
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
  label: css({
    display: "block",
    textTransform: "uppercase",
    fontSize: 14,
    color: "#00cec9",
    fontWeight: 600,
    margin: "0 0 5px 0"
  }),
  input: css({
    display: "block",
    width: "100%",
    border: "none",
    borderRadius: 5,
    backgroundColor: "#f0f6f7",
    padding: "12px 20px",
    fontSize: 15,
    fontWeight: 600,
    "&::placeholder": {
      color: "#aaa"
    }
  }),
  button: css({
    display: "flex",
    alignItems: "center",
    backgroundColor: "turquoise",
    border: "none",
    borderRadius: 5,
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
  }),
  premium: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 16,
    margin: "20px 0 0 0",
    textAlign: "center"
  }),
  premiumText: css({
    margin: 0,
    lineHeight: "1.5",
    "& a": {
      color: "inherit",
      fontWeight: 600
    }
  }),
  premiumIcon: css({
    color: "turquoise",
    width: 50,
    height: 50,
    margin: "10px 0"
  }),
  button: css({
    display: "flex",
    alignItems: "center",
    backgroundColor: "turquoise",
    border: "none",
    borderRadius: 5,
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
  expiration: css({
    margin: "10px 0 0 0",
    fontSize: 14
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
