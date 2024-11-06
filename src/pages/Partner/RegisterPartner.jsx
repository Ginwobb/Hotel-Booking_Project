import React from "react";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import SearchBoxMain from "../../Components/FilterSearch/SearchBoxMain";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import HotelPartnerRegisterForm from "../../Components/Partner/HotelPartnerRegisterForm";

function RegisterPartner() {
  return (
    <div>
      <div className="bg-gray-400 relative h-[100px]">
        <HeaderUserPage />
      </div>
      <div className="min-h-[] relative bg-[#f9f9f9] flex justify-center items-start">
        <div className="container mx-auto p-6 py-24 grid gap-5">
          {/* <SearchBoxMain /> */}

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 h-full">
              <div>
                <HotelPartnerRegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPartner;
