import React, { FC } from "react";

interface IProps {
  theme: any;
  data: any;
}

const FooterLayoutOne: FC<IProps> = ({ theme, data }) => {
  return (
    <div
      className="py-4"
      style={{
        backgroundColor: theme?.backgroundColor,
        color: theme?.linkColor,
      }}
    >
      <div className="container mx-auto px-8 flex justify-between font-semibold">
        <div className="space-x-8">
          {data.links.map((link: any, index: number) => {
            return (
              <a key={index} href={link.link}>
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FooterLayoutOne;
