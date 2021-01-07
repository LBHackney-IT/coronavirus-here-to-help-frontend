import { useRouter } from "next/router";
import Layout from '../components/layout';

export default function residents() {
  const router = useRouter();
  return (
    <Layout>
    <div>
      <a href="#" onClick={() => router.back()}>
        Back
      </a>
      <h1>Search residents</h1>
      <h2 class="lbh-heading-h1">Resident lookup</h2>
      <p class="lbh-body-m">
        Search for resident by postcode <strong>or</strong> name to see if weve
        helped them before.
      </p>
      <form action="/listresident">
        <div class="govuk-grid-row row-margin-top-m">
          <div class="govuk-grid-column-one-third">
            <label class="govuk-label" for="postcode">
              Postcode
            </label>
            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input govuk-input--width-10 lbh-input"
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
            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input govuk-input--width-12 lbh-input"
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

            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input govuk-input--width-12 lbh-input"
                id="lastName"
                name="lastName"
                type="text"
              />
            </div>
          </div>
        </div>
        <button
          class="govuk-button lbh-button js-cta-btn"
          data-module="govuk-button"
        >
          Search
        </button>
      </form>
    </div>
    </Layout>
  );
}
