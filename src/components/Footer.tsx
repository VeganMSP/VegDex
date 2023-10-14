import React from "react";
import {useAuth} from "../hooks/useAuth";

export const Footer = () => {
  const {user} = useAuth();

  return (
    <footer className="footer border-top fs-7 mt-auto py-3 bg-light text-muted">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-4">
            <SiteBio/>
          </div>

          <div className="col text-xs-start text-sm-end">
            <p className="my-0">
              The content for this site is <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA</a> unless specified otherwise.
            </p>
            <p className="my-0">
              The <a href="https://github.com/VeganMSP/veganmsp.com">code</a> for
              this site is <a href="https://www.gnu.org/licenses/agpl-3.0.txt">GNU AGPL-3.0</a>.
            </p>
          </div>
        </div>
        {user ? "Logged in" : "Not logged in"}
      </div>
    </footer>
  );
};

const SiteBio = () => {
  return (
    <div>
      <p className="my-0">
        Built by <a target="_blank" rel="noreferrer" href="https://jrgnsn.net">Matthew Jorgensen</a>.
      </p>
      <p className="my-0">
        Inspired by <a target="_blank" rel="noreferrer"
                       href="https://veganmilwaukee.com/">https://veganmilwaukee.com</a>.
      </p>
    </div>
  );
};
