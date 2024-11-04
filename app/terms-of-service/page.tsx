import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Explore our comprehensive Terms of Service agreement to understand the guidelines, rights, and responsibilities governing your use of our platform. Stay informed about user conduct, privacy policies, and legal obligations to ensure a secure and transparent online experience.",
};

export default function Page() {
  return (
    <>
      <div className="leading-10 p-4 max-w-4xl mx-auto scroll-mt-24">
        <h1 className="sm:text-5xl font-semibold text-4xl">Terms of Service</h1>
        <p className="text-sm py-4">Last updated: March 16, 2024</p>
        <div className="text-muted-foreground">
          1. Acceptance of Terms
          <br /> By accessing or using the Service, you agree to be bound by
          these Terms and our Privacy Policy. If you do not agree to all of
          these Terms, you may not access or use the Service.
          <br />
          2. Access to the Service
          <br /> 2.1 Registration:
          <br /> To access certain features of the Service, you may be required
          to register for an account. You agree to provide accurate, current,
          and complete information during the registration process and to update
          such information to keep it accurate, current, and complete.
          <br />
          3. Use of the Service
          <br /> 3.1 License:
          <br /> Subject to these Terms, we grant you a limited, non-exclusive,
          non-transferable, and revocable license to access and use the Service
          for your personal, non-commercial use. 3.2 Content:
          <br />
          The Service may contain writings, videos, and other materials
          (&quot;Content&quot;) provided by authors and third parties. You agree
          not to distribute, modify, transmit, or create derivative works based
          on any Content without our prior written consent. <br />
          3.3 Prohibited Conduct: You agree not to: <br />
          a. Use the Service for any illegal purpose or in violation of any
          applicable laws;
          <br /> b. Use the Service to harass, abuse, or harm another person;
          <br /> c. Interfere with or disrupt the Service or servers or networks
          connected to the Service;
          <br /> d. Attempt to gain unauthorized access to the Service or any
          accounts, computer systems, or networks connected to the Service;
          <br /> e. Impersonate any person or entity or falsely state or
          otherwise misrepresent your affiliation with a person or entity.
          <br />
          4. Intellectual Property
          <br /> 4.1 Ownership: <br /> All intellectual property rights in the
          Service and Content are owned by us or our licensors. Except as
          expressly provided in these Terms, nothing shall be construed as
          granting you any license or right to use any trademark, logo, or
          service mark displayed on the Service without our prior written
          permission. <br />
          4.2 User Content: By submitting any content to the Service, including
          but not limited to comments, feedback, or suggestions, you grant us a
          non-exclusive, royalty-free, perpetual, irrevocable, and fully
          sublicensable right to use, reproduce, modify, adapt, publish,
          translate, create derivative works from, distribute, and display such
          content throughout the world in any media.
          <br />
          5. Disclaimer of Warranties <br />
          THE SERVICE AND CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND
          &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND,
          EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT
          NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          <br />
          6. Limitation of Liability
          <br /> IN NO EVENT SHALL WE OR OUR OFFICERS, DIRECTORS, EMPLOYEES, OR
          AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          OR PUNITIVE DAMAGES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF
          THE SERVICE OR CONTENT, INCLUDING, BUT NOT LIMITED TO, LOSS OF
          PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES.
          <br />
          7. Indemnification <br />
          You agree to indemnify, defend, and hold harmless us and our officers,
          directors, employees, and agents from and against any and all claims,
          liabilities, damages, losses, costs, expenses, or fees (including
          reasonable attorneys&apos; fees) arising out of or in connection with
          your violation of these Terms.
          <br />
          8. Changes to Terms <br />
          We reserve the right to modify or replace these Terms at any time. If
          a revision is material, we will provide notice prior to any new terms
          taking effect. What constitutes a material change will be determined
          at our sole discretion.
          <br />
          9. Governing Law and Jurisdiction <br /> These Terms shall be governed
          by and construed in accordance with the laws of the State of
          California, without regard to its conflict of law provisions. You
          agree that any legal action or proceeding arising out of or in
          connection with these Terms or the Service shall be brought
          exclusively in the state or federal courts located in California, and
          you hereby consent to the jurisdiction and venue of such courts.
          <br />
          10. Contact Us <br /> If you have any questions about these Terms,
          please contact us at{" "}
          <Link
            className="underline"
            href="mailto:projectgenzwrites@gmail.com"
            target="_blank"
          >
            projectgenzwrites@gmail.com
          </Link>
          .
          <br />
          By accessing or using the Service, you acknowledge that you have read,
          understood, and agree to be bound by these Terms.
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-12">
        <Footer />
      </div>
    </>
  );
}
