import React from "react";

const sizeClasses = {
  txtPoppinsBold15: "font-bold font-poppins",
  txtRobotoRomanMedium15Green9007e: "font-medium font-roboto",
  txtMontserratRomanBold22: "font-bold font-montserrat",
  txtRobotoRomanMedium15: "font-medium font-roboto",
  txtRobotoRomanRegular13: "font-normal font-roboto",
} as const;

export type TextProps = Partial<{
  className: string;
  size: keyof typeof sizeClasses;
  as: any;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  size,
  as,
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
