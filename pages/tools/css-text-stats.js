import HeadBlock from "../../components/head";
import Generic from "../../styles/Generic.module.css";
import TextStyles from "../../styles/Text.module.css";
import HomeStyles from "../../styles/Home.module.css";
import ContainerStyles from "../../styles/Container.module.css";
import CSSTextStatsStyles from "../../styles/CSSStats.module.css";
import PostStyles from "../../styles/PostContent.module.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import Header from "../../components/header";
import Footer from "../../components/footer";

export default function CSSTextStats() {
  const getFontStats = async () => {
    const urlInput = document.getElementById("urlInput").value;
    const url = `https://cssstats.com/api/stats?url=${encodeURIComponent(
      urlInput
    )}`;

    // const url = "https://cssstats.com/api/stats?url=textlab.dev";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json);
      displayStats(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const displayStats = (data) => {
    const container = document.getElementById("stats");

    const properties = data.stats.declarations.properties;
    const propertyGroups = {
      "Font Properties": [
        "font-family",
        "font-size-adjust",
        "size-adjust",
        "font-weight",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-variation-settings",
        "font-size",
      ],
      "Text Properties": [
        "text-transform",
        "text-wrap",
        "text-align",
        "text-decoration",
        "line-height",
        "letter-spacing",
      ],
    };

    // Loop through each subgroup and its properties
    for (const group in propertyGroups) {
      if (propertyGroups.hasOwnProperty(group)) {
        const groupProperties = propertyGroups[group];

        // Create a section element for the subgroup
        const groupSection = document.createElement("section");
        // groupSection.classList.add("groupSection");
        groupSection.className = CSSTextStatsStyles.groupSection;

        // Create a heading for the subgroup
        const groupHeading = document.createElement("h2");
        groupHeading.textContent = group;
        groupSection.appendChild(groupHeading);

        // Loop through each property in the subgroup
        groupProperties.forEach((property) => {
          if (properties.hasOwnProperty(property)) {
            const values = properties[property];

            // Create a section element for the property
            const section = document.createElement("section");
            section.className = CSSTextStatsStyles.groupItem;

            // Create a heading for the property
            const heading = document.createElement("h3");
            heading.textContent = property;
            section.appendChild(heading);

            // Create an unordered list
            const ul = document.createElement("ul");
            ul.className = CSSTextStatsStyles.groupList;

            // Use an object to count occurrences of each value
            const valueCounts = values.reduce((acc, value) => {
              acc[value] = (acc[value] || 0) + 1;
              return acc;
            }, {});

            // Append each unique value as a list item to the unordered list
            for (const value in valueCounts) {
              if (valueCounts.hasOwnProperty(value)) {
                const li = document.createElement("li");
                ul.className = `${CSSTextStatsStyles.groupList} ${CSSTextStatsStyles.groupListItem}`;

                li.innerHTML = `${value} <span>(${valueCounts[value]})</span>`;
                ul.appendChild(li);
              }
            }

            // Append the unordered list to the section
            section.appendChild(ul);

            // Append the property section to the group section
            groupSection.appendChild(section);
          }
        });

        // Append the group section to the container
        container.appendChild(groupSection);
      }
    }
  };

  return (
    <div className={Generic.pageContainer}>
      <HeadBlock
        title="Tools | CSS Text Stats"
        description="Stats on the usage of font and text css properties used within a site"
        url="https://textlab.dev/tools/css-text-stats"
        image="/images/metadata/main-og3.jpg"
      />
      <GoogleAnalytics gaId="G-BKGWYR0HVY" />

      <main className={HomeStyles.main}>
        <Header />

        <section className={`${ContainerStyles.section} PageHeader`}>
          <div className={`${ContainerStyles.stacked}`}>
            <h1 className={TextStyles.heading}>CSS Text Stats</h1>
          </div>
        </section>

        <section className={`${CSSTextStatsStyles.container}`}>
          <div className={CSSTextStatsStyles.userInput}>
            <input
              type="text"
              id="urlInput"
              placeholder="URL e.g. textlab.dev"
              className={CSSTextStatsStyles.input}
            />
            <button
              onClick={getFontStats}
              type="button"
              className={CSSTextStatsStyles.button}
            >
              Get stats
            </button>
          </div>
          <div id="stats" className={CSSTextStatsStyles.statsGrid}></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
