import React from "react";
import { Button, Dropdown } from "../Form";
import { useState } from "react";

export default function CaseNotes() {
	const fakeUsers = [
		"Annalivia Ryan",
		"Ben Dalton",
		"Liudvikas T",
		"Marten Wetterberg",
	];
	const supportTypes = [
		"Help Request",
		"CEV",
		"Welfare",
		"Shielding",
		"Contact tracing",
	];

	const [selectedSupportType, setSelectedSupportType] = useState("");

	const onChange = (value) => {
		setSelectedSupportType(value);
	};

	return (
		<div>
			<h2 className="govuk-heading-l">Case notes</h2>
			<Dropdown
				onChange={(value) => onChange(value)}
				dropdownItems={Object.values(supportTypes)}
			/>
			{fakeUsers.map((fakeUser, index) => {
				return (
					supportTypes[index] == selectedSupportType && (
						<>
							<div
								style={{
									backgroundColor: "rgba(220, 233, 213, 1)",
									padding: "20px",
									marginTop: "20px",
								}}
								id={supportTypes[index]}
								className="filter"
								data-type={supportTypes[index]}
							>
								<h4 className="govuk-heading-s" className="filter">
									2020-01-0{Math.floor(Math.random() * 9)} by{" "}
									{fakeUser}
								</h4>
								<p>{supportTypes[index]}: Random Text</p>
							</div>
							<hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
						</>
					)
				);
			})}
		</div>
	);
}
