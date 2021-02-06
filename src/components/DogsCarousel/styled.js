import styled from "styled-components";

export default styled.div`
  margin: 1.25rem 0 1.75rem 0;
  text-align: center;
  /*
   * slideshow
   */
  .horizontal_carousel {
    position: relative !important;
    .slides {
      .slide {
        margin-right: 0.5rem;
        margin-left: 0.5rem;
      }
    }
  }
  /*
   * controls
   */
  .arrows {
    //display:none;
    position: absolute;
    width: calc(100% + 2rem);
    height: 100%;
    left: -1.125rem;
    pointer-events: none;
    .arrow {
      pointer-events: all;
      position: absolute;
      border-radius: 30px;
      width: 60px;
      height: 60px;
      background: none;
      font-size: 2.25rem;
      font-weight: bold;
      line-height: 60px;
      background: var(--color-primary);
      border: none;
      outline: none;
      background: white;
      color: #111;
      box-shadow: none !important;
      top: 33% !important;
      &.prev {
        left: -0.5rem !important;
        text-align: left;
        text-indent: 1.7rem;
      }
      &.next {
        right: -0.85rem !important;
        text-indent: 0.2rem;
      }
      svg {
        position: relative;
        top: -0.025rem;
        font-size: 64px;
      }
      &.arrow-right {
        right: -10px;
        svg {
          width: 85%;
          right: 0.05rem;
        }
      }
      &.arrow-left {
        left: -6px;
        svg {
          width: 85%;
          left: 0.45rem;
        }
      }
      &[disabled] {
        opacity: 0.175;
        cursor: default;
        //border-color: transparent;
      }
    }
    &.top {
      top: 0;
      .arrow {
        top: 41%;
      }
    }
    &.middle {
      top: 0;
      .arrow {
        top: calc(72.5% - 1.25rem);
      }
    }
    &.bottom {
      bottom: -2.25rem;
      .arrow {
        bottom: 1.67rem;
        background: none;
        color: var(--color-primary);
        box-shadow: none;
        &[disabled] {
          opacity: 0;
        }
      }
    }
  }
`;
