import Image from "next/image";
import React from "react";
import ArrowLeft from "@/assets/images/ranking_arrow_left.svg";
import ArrowRight from "@/assets/images/ranking_arrow_right.svg";

const Rankingpage = () => {
  return (
    <section>
      <div>
        <h2>랭킹 순위</h2>
        <form>
          <input type="text" placeholder="검색어를 입력해 주세요" />
        </form>
      </div>
      <ul>
        <li>랭킹</li>
        <li>닉네임</li>
        <li>마피아</li>
        <li>노래 맞추기</li>
        <li>총점</li>
      </ul>
      <ul>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
        <li>
          <div>
            <h2>999</h2>
            <h3>닉네임</h3>
            <p>1000</p>
            <p>1000</p>
            <p>2000</p>
          </div>
        </li>
      </ul>
      <div>
        <button>
          <Image src={ArrowLeft} alt="left button" />
        </button>
        <ol>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ol>
        <button>
          <Image src={ArrowRight} alt="right button" />
        </button>
      </div>
    </section>
  );
};

export default Rankingpage;
