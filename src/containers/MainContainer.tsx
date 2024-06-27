import React from 'react';

const MainContainer = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="min-h-[90vh] p-4 w-full h-full max-w-full lg:max-w-[1200px] xl:max-w-[1600px] lg:mx-auto flex flex-col items-center justify-start">
			{children}
		</div>
	);
};

export default MainContainer;
