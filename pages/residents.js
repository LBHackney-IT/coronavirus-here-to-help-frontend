import { useRouter } from "next/router";
import Layout from "../components/layout";
import { Button } from "../components/Form";

export default function residents() {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <a href="#" onClick={() => router.back()} class="govuk-back-link">
          Back
        </a>
        <h1 class="govuk-heading-xl">Resident lookup</h1>
        <p class="govuk-body">
          Search for resident by postcode <strong>or</strong> name to see if
          weve helped them before.
        </p>
        <form action="/listresident">
          <div class="govuk-grid-row row-margin-top-m">
            <div class="govuk-grid-column-one-third">
              <label class="govuk-label" for="postcode">
                Postcode
              </label>
              <div class="govuk-form-group">
                <input
                  class="govuk-input govuk-input--width-10"
                  id="postcode"
                  name="postcode"
                  type="text"
                />
              </div>
            </div>

            <div class="govuk-grid-column-one-third">
              <label class="govuk-label" for="firstName">
                First name
              </label>
              <div class="govuk-form-group">
                <input
                  class="govuk-input govuk-input--width-12"
                  id="firstName"
                  name="firstName"
                  type="text"
                />
              </div>
            </div>

            <div class="govuk-grid-column-one-third">
              <label class="govuk-label" for="lastName">
                Last name
              </label>

              <div class="govuk-form-group">
                <input
                  class="govuk-input govuk-input--width-12"
                  id="lastName"
                  name="lastName"
                  type="text"
                />
              </div>
            </div>
          </div>
          <Button
            text="Search"
            addClass="govuk-!-margin-right-1"
            type="submit"
          />
        </form>
      </div>
    </Layout>
  );
}
