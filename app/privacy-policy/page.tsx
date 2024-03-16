import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Delve into our Privacy Policy to learn how we protect your personal information, adhere to data regulations, and ensure transparency in our data handling practices.",
};
export default function Page() {
  return (
    <>
      <div className="text-slate-200 leading-10 opacity-70 p-4 max-w-4xl mx-auto scroll-mt-24">
        <h1 className="sm:text-5xl font-medium text-4xl">Privacy Policy</h1>
        <p className="text-sm py-4">Last updated: March 16, 2024</p>
        <p>
          This Privacy Policy (&quot;Policy&quot;) describes how
          ProjectGenZWrites (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          collects, uses, and discloses information when you use the
          ProjectGenZWrites Writing Database (&quot;Service&quot;). <br /> 1.
          Information We Collect
          <br />
          1.1 Information You Provide: When you register for an account or use
          certain features of the Service, you may provide us with personal
          information such as your name, email address, and any other
          information you choose to provide.
          <br />
          1.2 Automatically Collected Information: We may automatically collect
          certain information about your use of the Service, including your IP
          address, device information, browser type, and usage data.
          <br />
          2. Use of Information <br />
          2.1 We may use the information we collect to:
          <br />
          a. Provide and maintain the Service;
          <br />
          b. Personalize your experience and improve the Service; <br />
          c. Communicate with you about the Service, including responding to
          your inquiries and providing customer support; <br />
          d. Enforce our terms and policies; <br />
          e. Protect against fraud and ensure the security of the Service;{" "}
          <br />
          f. Comply with legal obligations. <br />
          3. Disclosure of Information <br />
          3.1 We may disclose your information to: <br />
          a. Service providers who assist us in providing the Service; <br />
          b. Law enforcement or other government agencies in response to a legal
          request or if we believe disclosure is necessary to protect our
          rights, protect your safety or the safety of others, investigate
          fraud, or comply with a law, court order, or legal process; <br />
          c. Third parties in connection with a merger, acquisition, or sale of
          all or a portion of our assets. <br />
          4. Data Security <br />
          4.1 We take reasonable measures to protect the security of your
          information and prevent unauthorized access, disclosure, alteration,
          or destruction. <br />
          5. Your Choices <br />
          5.1 You may access and update certain personal information by logging
          into your account settings. <br />
          5.2 You may choose to opt-out of certain communications from us by
          following the unsubscribe instructions provided in such
          communications. <br />
          6. Children&apos;s Privacy <br />
          6.1 The Service is not intended for use by children under the age of
          13. We do not knowingly collect personal information from children
          under the age of 13. If you are a parent or guardian and believe that
          your child has provided us with personal information, please contact
          us so that we can delete the information. <br />
          7. Changes to this Policy
          <br />
          7.1 We may update this Policy from time to time by posting the updated
          Policy on the Service. Your continued use of the Service after any
          changes to this Policy will constitute your acceptance of the changes.{" "}
          <br />
          8. Contact Us <br />
          If you have any questions about this Policy, please contact us at{" "}
          <Link
            className="underline"
            href="mailto:projectgenzwrites@gmail.com"
            target="_blank">
            projectgenzwrites@gmail.com
          </Link>
          .
          <br />
          By using the Service, you acknowledge that you have read, understood,
          and agree to be bound by this Policy
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-12">
        <Footer />
      </div>
    </>
  );
}
