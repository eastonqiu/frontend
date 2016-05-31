import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Navbar, Glyphicon} from 'react-bootstrap';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>

        <Navbar fixedTop>
          <div className={styles.searchBar}>
            <div className={styles.logo}>
              <img src="http://ww2.sinaimg.cn/crop.0.0.1080.1080.1024/d773ebfajw8eum57eobkwj20u00u075w.jpg" />
            </div>
            <form className="navbar-form navbar-left">
              <div className="input-group">
                <input type="text" ref="email" placeholder="Search" className="form-control"/>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-success">搜索</button>
                </span>
              </div>
            </form>
          </div>
        </Navbar>

        <div className="container">
          {/* row style to remove the padding left and right */}
          <div className="row">

            {/* slide part */}
            <div className={styles.slide}>
              <img src="http://m.360buyimg.com/mobilecms/s720x350_jfs/t2791/174/1658691661/77234/4e3a0d2d/5745843cN92616518.jpg!q70.jpg" width="100%" />
            </div>

            {/* quick entry nav */}
            <nav className={styles.quickEntry}>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2839/96/1433596951/3566/4dc2eaf4/573efddfN85ed7181.png"/>
                <span>超市</span>
              </a>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2821/182/1679888879/6257/cc125453/574699b9Ncddac4b4.png"/>
                <span>海淘</span>
              </a>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2899/335/661406691/2594/9180c6fc/57218c63Nc8120bc4.png"/>
                <span>充值</span>
              </a>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2812/145/705232823/5051/22bb76d6/57218c85N56467fac.png"/>
                <span>服装</span>
              </a>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2644/181/695458124/3496/bc796b2b/57218cc5N307dc848.png"/>
                <span>理财中心</span>
              </a>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2764/361/1390006842/3447/37d7580e/573e6352N92e81cbd.png"/>
                <span>我要领券</span>
              </a>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2617/268/700561275/3050/b4d22b43/57218d24N94a9bd28.png"/>
                <span>物流查询</span>
              </a>
              <a href="#">
                <img src="http://m.360buyimg.com/mobilecms/s78x78_jfs/t2785/198/692109241/3256/e7ac7a79/57218d43N273a7542.png"/>
                <span>我的关注</span>
              </a>
            </nav>

            {/* goods block */}
            <div className={styles.showBlock}>
              <div className={styles.blockTitle}>
                <span>畅销区</span>
                <a href="#">
                  更多
                  <Glyphicon className={styles.ricon} glyph="menu-right"/>
                </a>
              </div>
              {/* goods */}
              <div className={styles.goodsList}>
                <div className={styles.goods}>
                  <a href="#">
                    <img src="http://m.360buyimg.com/mobilecms/s220x220_jfs/t2146/123/360714867/93332/1a0862a4/56021f61N7bd76e30.jpg!q70.jpg"/>
                    <span>$155</span>
                  </a>
                </div>

                <div className={styles.goods}>
                  <a href="#">
                    <img src="http://m.360buyimg.com/mobilecms/s220x220_jfs/t2146/123/360714867/93332/1a0862a4/56021f61N7bd76e30.jpg!q70.jpg"/>
                    <span>$155</span>
                  </a>
                </div>

                <div className={styles.goods}>
                  <a href="#">
                    <img src="http://m.360buyimg.com/mobilecms/s220x220_jfs/t2146/123/360714867/93332/1a0862a4/56021f61N7bd76e30.jpg!q70.jpg"/>
                    <span>$155</span>
                  </a>
                </div>
              </div>
            </div>

            {/* goods block */}
            <div className={styles.showBlock}>
              <div className={styles.blockTitle}>
                <span>精品区</span>
                <a href="#">
                  更多
                  <Glyphicon className={styles.ricon} glyph="menu-right"/>
                </a>
              </div>
              {/* goods */}
              <div className={styles.goodsList}>
                <div className={styles.goods}>
                  <a href="#">
                    <img src="http://m.360buyimg.com/mobilecms/s220x220_jfs/t2146/123/360714867/93332/1a0862a4/56021f61N7bd76e30.jpg!q70.jpg"/>
                    <span>$155</span>
                  </a>
                </div>

                <div className={styles.goods}>
                  <a href="#">
                    <img src="http://m.360buyimg.com/mobilecms/s220x220_jfs/t2146/123/360714867/93332/1a0862a4/56021f61N7bd76e30.jpg!q70.jpg"/>
                    <span>$155</span>
                  </a>
                </div>

                <div className={styles.goods}>
                  <a href="#">
                    <img src="http://m.360buyimg.com/mobilecms/s220x220_jfs/t2146/123/360714867/93332/1a0862a4/56021f61N7bd76e30.jpg!q70.jpg"/>
                    <span>$155</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
