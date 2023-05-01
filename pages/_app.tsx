import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { getStyledComponentObject } from "@/utils/colorSystem";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div<any>`
  background-color: ${(props) => props.backgroundColor || "white"};
  /* other styles */
`;

export default function App({ Component, pageProps }: AppProps) {
  const [styles, setStyle] = useState<Object>({})

  useEffect(()=>{
    setStyle(getStyledComponentObject("GalleryComponent"))
  }, [])

  return (
    <StyledDiv
      suppressHydrationWarning
      {...styles}
    >
      <h1>HELLO WORLD</h1>
    </StyledDiv>
  );
}
