import React, { useEffect, useState } from "react";
import "./Conributors.css"
import CountdownTimer from "./Countdowntimer";
const ContributorsPage = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const ownerName = "GDSC-KPGU";
    const repoName = "Google-Cloud-Study-Jam-User-Data-App";
    const apiURL = `https://api.github.com/repos/${ownerName}/${repoName}/contributors`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((contributors) => {
        setContributors(contributors);
      })
      .catch((error) => {
        console.error("Error fetching contributors:", error);
      });
  }, []);

  return (
    <main className="bg-gray-900 min-h-screen">
      <section className="Team ">
        <div className="team-top my-0" id="slide">
          <div className="heading-contributors my-0">Meet our Conrtibutors (Hover to see )</div>

          <div className="team-members">
            {contributors.map((contributor) => (
              <div className="team-member" key={contributor.id}>
                {/* Box Panel */}
                <section className="box-panel">
                  <div className="widget-container">
                    <div className="flip-box common-flip-style">
                      {/* Front */}
                      <div className="box-front common-box-style">
                        <div className="box-content-wrapper">
                          <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="team-member-img"
                          />
                        </div>
                      </div>

                      {/* Back */}
                      <div className="box-back common-box-style box-bgi-effect">
                        <div className="box-content-wrapper">
                          <div className="box-content">
                            <h1>Hello there !</h1>
                            <h1>
  I am the{" "}
  <a
    href={contributor.html_url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <strong>{contributor.login}</strong>
  </a>
</h1>
                            <h1>Commits: {contributor.contributions}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contributor Link */}
                {/* <a href={contributor.html_url} target="_blank">
                  <p className="text-white text-3xl ">{contributor.login}</p>
                </a> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};


export default ContributorsPage;
