import { getPowerBICaseNotesArray } from './case_notes_helper';

describe('Case note helper', () => {
    it.only('can format powerBi case notes', () => {
        const unformattedCaseNote =
            '[2021-01-02]voicemail left.[2021-01-02]no answer[2021-01-02]voicemail left';

        const expectedResponse = [
            { note: 'voicemail left.', noteDate: new Date('2021-01-02') },
            { note: 'no answer', noteDate: new Date('2021-01-02') },
            { note: 'voicemail left', noteDate: new Date('2021-01-02') }
        ];

        const response = getPowerBICaseNotesArray(unformattedCaseNote);

        expect(response).toEqual(expectedResponse);
    });
});
