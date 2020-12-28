import styled from "styled-components";

export const MainStyled = styled.main`
  padding: 4rem 0;
  hr {
    padding: 0;
    margin: 2rem 0 0.75rem 0;
  }
  h1 {
    text-transform: capitalize;
  }
  h3 {
    text-transform: capitalize;
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 1rem 0;
  }
  section {
    margin-top: 2rem;
  }
  .subtypesImage {
    position: relative;
    border: solid 0.25rem white;
    display: inline-flex;
    img {
      border-radius: 0.25rem;
    }
    .breedImageCaption {
      position: absolute;
      bottom: 0;
      left: 0;
      background: white;
      text-transform: capitalize;
      padding-right: 0.25rem;
      border-top-right-radius: 0.25rem;
    }
  }
`;
