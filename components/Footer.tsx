import {FC} from "react";

const Footer:FC = () => {

  return (
    <>
      <footer className={"bottom-0 right-0 left-0 block py-4 bg-darkgray text-subwhite border-0"}>
        <div className="container mx-auto px-4 border-0">
          <div className="flex flex-wrap items-center">
            <div className="px-2">
              <div className="text-sm text-gray-600 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  className="text-sm font-semibold py-1"
                >
                  The Hoodie Crew
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer