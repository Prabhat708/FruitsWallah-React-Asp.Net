import Navbar from "../components/Navbar";

const TermAndConditionPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">
              Terms and Conditions
            </h1>

            <p>
              <strong>Effective Date:</strong> [01/09/2025]
            </p>

            <h4 className="mt-4">1. Disclaimer</h4>
            <p>
              In case of any discrepancy or difference between the translated
              versions and the English version of this document,{" "}
              <strong>the English version shall prevail</strong>.
            </p>

            <h4 className="mt-4">2. Introduction</h4>
            <p>
              This Terms of Use document is an electronic record in accordance
              with the Information Technology Act, 2000 and applicable rules
              thereunder. This document does not require any physical or digital
              signatures.
            </p>
            <p>
              It is published in compliance with Rule 3(1) of the Information
              Technology (Intermediaries Guidelines) Rules, 2011.
            </p>

            <h4 className="mt-4">3. About Us</h4>
            <p>
              The Platform is owned and operated by{" "}
              <strong>FruitsWallah Private Limited</strong>, a company
              incorporated under the Companies Act, 1956.
            </p>
            <ul>
              <li>
                Registered Office: Lucknow
                
              </li>
              
            </ul>

            <h4 className="mt-4">4. Acceptance of Terms</h4>
            <p>
              By using the Platform, you agree to be bound by these Terms and
              all related policies, including our Privacy Policy.
            </p>

            <h4 className="mt-4">5. User Definition</h4>
            <p>
              “You” or “User” refers to any person who accesses or transacts on
              the Platform. You may browse or purchase without registration.
            </p>

            <h4 className="mt-4">6. Membership Eligibility</h4>
            <p>
              Only individuals legally capable of entering contracts under the
              Indian Contract Act, 1872 may use the Platform. Minors must use
              the Platform under parental or legal guardian supervision.
            </p>

            <h4 className="mt-4">7. Account & Registration Obligations</h4>
            <p>
              Users must maintain the confidentiality of their account
              credentials. You are solely responsible for all activities under
              your account.
            </p>
            <ul>
              <li>Keep your mobile and email updated</li>
              <li>Do not share login credentials</li>
              <li>Log out after each session</li>
            </ul>

            <h4 className="mt-4">8. Communications</h4>
            <p>
              By using the Platform, you consent to receive electronic
              communications from FruitsWallah, including emails and
              notifications.
            </p>

            <h4 className="mt-4">9. Transactions & Communication</h4>
            <p>
              The Platform connects buyers and sellers. FruitsWallah is not a
              party to any transaction and does not control the quality or
              legality of the goods/services offered.
            </p>

            <h4 className="mt-4">10. Amendments</h4>
            <p>
              FruitsWallah may update these Terms at any time. Continued use of
              the Platform after changes constitutes acceptance.
            </p>

            <h4 className="mt-4">11. Contact Us</h4>
            <p>
              📧 Contact@fruitswallah.in
              <br />
              📍 FruitsWallah Private Limited Lucknow.
            </p>

            <p className="text-muted mt-4">
              © {new Date().getFullYear()} FruitsWallah Private
              Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermAndConditionPage;
