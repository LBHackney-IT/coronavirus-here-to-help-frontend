import moment from 'moment';
import { formatSubText } from '../../helpers/formatter';
import { WELFARE_CALL } from '../../helpers/constants';
import styles from './CallHistory.module.scss';

export default function CaseNotes({ calls }) {
    const FormatCallOutcome = (outcome) => {
        if (!outcome) return null;
        return outcome
            .replace('callback_complete', 'Callback complete')
            .replace('refused_to_engage', 'Refused to engage')
            .replace('call_rescheduled', 'Call rescheduled')
            .replace('voicemail', 'Voicemail left')
            .replace('wrong_number', 'Wrong number')
            .replace('no_answer_machine', 'No answer machine')
            .replace('food_consortia_referral_needs', 'The resident needed a referral to the food consortia')
            .replace('other_support_needs', 'The resident had other support needs')
            .replace('no_support_needs', 'The resident did not require support')
    };

    return (
        <div>
            <h2 className="govuk-heading-l">Call history</h2>
            {calls.length < 1 &&
                <>
                    <div className={styles['call-history-box'] }>No previous calls</div>
                    <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                </>}
            {calls?.map((call, index) => {
                return (
                    <>
                        <div
                            key={`call-history-item-${index}`}
                            className={styles['call-history-box']}
                            id={`call-note-${call.id}`}
                            data-testid="call-history-entry"
                        >
                            <h4 className="govuk-heading-s">
                                {moment(call.callDateTime).format('YYYY-MM-DD HH:mm')} by{' '}
                                {call.callHandler}
                            </h4>
                            <p>
                                {call.callDirection}{' '}
                                {call.callType == WELFARE_CALL
                                    ? 'Self Isolation Call'
                                    : formatSubText(call.callType, call.helpNeededSubtype)}
                                : {FormatCallOutcome(call.callOutcome)}
                            </p>
                        </div>
                        <hr 
                            key={`call-history-section-break-${index}`}
                            className="govuk-section-break govuk-section-break--m govuk-section-break--visible"
                        />
                    </>
                );
            })}
        </div>
    );
}
