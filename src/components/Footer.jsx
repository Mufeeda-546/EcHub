import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-green-700 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">EcHub</h2>
        <p className="mb-2">Sustainable Living, Made Simple.</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} EcHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
