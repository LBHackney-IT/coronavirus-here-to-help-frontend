import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { CallHandlerGateway } from '../gateways/call-handler';
import Link from 'next/link';
import { Button } from '../components/Form';

export default function managecallhandlers() {
    const [callHandlers, setCallHandlers] = useState([]);

    useEffect(async () => {
        const gateway = new CallHandlerGateway();
        try {
            const callHandlersList = await gateway.getCallHandlers();

            setCallHandlers(callHandlersList);
        } catch (err) {
            console.log(`Error fetching callhandlers: ${err}`);
        }
    }, []);

    return (
        <Layout>
            <div>
                <a
                    href="/admin"
                    className="govuk-back-link  lbh-back-link"
                    data-testid="assign-call-back_button">
                    Back
                </a>

                <h1 className="govuk-heading-xl" style={{ marginBottom: '20px' }}>
                    Manage callhandlers(s)
                </h1>

                <h2 className="govuk-heading-l">Add a new callhandler</h2>
                <Link href="/manage-callhandlers/add-callhandler">
                    <Button data-testid="add-call-handler" text="Add" />
                </Link>

                <h2 className="govuk-heading-l">Active callhandler(s)</h2>

                <table className="govuk-table" data-testid="callbacks-table">
                    <tbody className="govuk-table__body">
                        {callHandlers.map((callHandler, index) => {
                            return (
                                <tr
                                    className="govuk-table__row"
                                    key={`callbacks-list_row-${index}`}
                                    data-testid="callbacks-table_row">
                                    <td className="govuk-table__cell">{`${callHandler.name}`}</td>

                                    <td className="govuk-table__cell">
                                        <Link
                                            href="/manage-callhandlers/[callhandlerId]"
                                            as={`/manage-callhandlers/${callHandler.id}`}>
                                            <a
                                                href="#"
                                                data-testid={`callhandler-edit_link-${index}`}>
                                                edit/remove
                                            </a>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
