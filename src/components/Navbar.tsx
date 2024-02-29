import React from "react";

interface Props {}

const Navbar = (props: Props) => {
	return (
		<div className="flex bg-slate-200 font-semibold text-2xl p-5">
			<h1>
				<span className="text-[#b5a369]">Math Success Center</span> · Lindenwood
				University
			</h1>
		</div>
	);
};

export default Navbar;
