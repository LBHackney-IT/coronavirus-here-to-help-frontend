import React from "react";

export default function KeyInformation() {
	return (
		<div>
			<div style={{padding: '20px', marginBottom: '20px', position: 'relative', fontFamily: 'sans-serif', border: '1px', solid: '#b1b4b6'}}>
				<h3 style={{fontFamily: 'sans-serif', fontSize: '22px'}}>
					Contact details
				</h3>
				<br />
				<p>
					Phone 1: 0292848
					<br />
					Phone 2: 078933983
				</p>
				<br />
				<h4 class="govuk-heading-s" style={{fontFamily: 'sans-serif'}}>Address</h4>
				<br />
				<p>
					123 Test Road
					<br />
					E67 H78
				</p>
				<br />
				<h4 class="govuk-heading-s" style={{fontFamily: 'sans-serif'}}>Alternate contact:</h4>
				<br />
				<p>
					Test Test
					<br />
					Relationship: Carer
					<br />
					Phone 1: 039384
					<br />
					Phone 2: 071839
				</p>

				<a
					href="/editresident"
					style={{textDecoration: 'none', position: 'absolute', top: '10px', right: '10px', fontSize: '15px', lineHeight: '20px',
width: '20px', textAlign: 'center', color: '#090', margin: '0', padding: '0'}}
				>
					✎
				</a>
			</div>

			<div style={{padding: '20px', position: 'relative', fontFamily: 'sans-serif', border: '1px', solid: '#b1b4b6'}}>
				<h3 style={{fontFamily: 'sans-serif', fontSize: '20px'}}>
					Key information
				</h3>
				<br />
				<p>
					CEV
					<br />
					Positive Covid test at 2 Dec 2020
					<br />
					CEV Contact Tracing ID: SL 99 88 12 A
				</p>
				<br />
				<h4 style={{position: 'relative',fontFamily: 'sans-serif', fontSize: '22px'}}>
					Key notes:
					<a
						href="/editresident#down"
						style={{textDecoration: 'none', position: 'absolute', top: '0px', right: '10px', fontSize: '15px', 
                        lineHeight: '20px', width: '20px', textAlign: 'center', color: '#090', margin: '0', padding: '0'}}

					>
						✎
					</a>
				</h4>
				<br />
				<p>Calls Helpline often, highly anxious about Covid</p>
			</div>

			<a
				href="#"
				class="minimize"
				onclick="document.getElementsByClassName('sticky-magic')[0].classList.toggle('hidden')"
			></a>
		</div>
	);
}
