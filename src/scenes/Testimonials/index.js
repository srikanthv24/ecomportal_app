import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Container } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import avatarThubnile from "../../assets/home/testimonials/Vibrant-Living-logo.png";
import AmalaAkkineni from "../../assets/home/testimonials/Amala-Akkineni.jpg";
import BhragaviKunam from "../../assets/home/testimonials/Bhragavi-Kunam.jpg";
import GeminiKiran from "../../assets/home/testimonials/gemini-kiran.jpg";
import GuruvaReddy from "../../assets/home/testimonials/Guruva-Reddy.jpg";
import MajulaSwaroop from "../../assets/home/testimonials/Majula-Swaroop.jpg";
import NagarjunaAkkineni from "../../assets/home/testimonials/Nagarjuna-Akkineni.jpg";
import Namratha from "../../assets/home/testimonials/Namratha.jpg";
import Shilpareddy from "../../assets/home/testimonials/Shilpareddy.jpg";
import SupriyaYarlagadda from "../../assets/home/testimonials/Supriya-Yarlagadda.jpg";
import Thamanna from "../../assets/home/testimonials/Thamanna.jpg";
import "./styles.scss";

function Testimonials() {
    let history = useHistory();
    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        dots: false,
        autoplay: false,
        // navText: ["Prev", "Next"],
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 3,

            }
        }
    }
    return (
        <>
            <Container fluid className="px-0">
                <section className="vlfaq-wrapper py-5 relative">
                    <h4 className="testmonials-titletxt">Our clients are going...</h4>
                    <div className="home-mmm-letter-bg"></div>
                    <div className="container">
                        <div>
                            <OwlCarousel
                                dots={true}
                                dotsEach={false}
                                className="owl-theme testimonials"
                                loop
                                margin={20}
                                nav {...options}
                            >
                                <div>
                                    <div className="testimonials-item design1">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">The pesto n veggies were awesome I cud
                                            literally eat that all the time Dinner was fab So filling n yummy</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={Thamanna} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Tamanna,&nbsp;<strong>Actress</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design2">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">I’ve been enjoying the treats from Sridevi’s
                                            kitchen studio for some time now along with my family. I love the taste and the feeling of
                                            comfort they give. Having known Sridevi for some time, I can see the passion and commitment
                                            with which she makes her food. The bonus of course is that she is an experienced
                                            nutritionist who knows her stuff inside out and makes her food with organic sources as much
                                            as possible. 11m surely among her top fans of food!</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={Namratha} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Namratha Shirodkar,&nbsp;<strong>Miss India 1993, Actress</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design3">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">I am really enjoying your salads. Your sauces
                                            are outstanding! Phenomenal ! I look forward to your meals everyday !</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Mohan Reddy,&nbsp;<strong>Cyient</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design1">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">My daughter just with your counseling class
                                            following basics and lost around 6 kgs , I am very happy for her, she is feeling
                                            great.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Srinivas<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design2">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">U deserve every bit of that Applause Sista..u
                                            took the initiative in the most neglected but much needed part of Food industry...and taking
                                            it forward with such an elan..I just bow to u..n wish u all success ahead.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Nithu Su<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design3">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">As someone who is extremely conscious about
                                            what i put into my body. I hv immense trust in Sridevi 4 her knowledge about food and
                                            nutrition. She handles food with lots of love and at most care and with a genuine intent and
                                            desire to Nourish. Not many people might put emphasis on this but to me this is most
                                            important!! The intent behind the person who makes ur food. Her food is not just nourishing
                                            and tasty but is holistic, wholesome, satiating soulful and has a vibrant vibe to it</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={Shilpareddy} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Shilpa Reddy,<strong>Fashion Designer</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design1">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Good morning Sridevi!! Just wanted to thank you for the wonderful
                                            food! Not only am I satiated but also happy and elated! Maybe the food is doing the trick!
                                            I'm so glad I found you.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Suvarchala,<strong>Doctor</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design2">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Never thought diet food can be this tasty. Thoroughly enjoying my
                                            lunches everyday Sauces are fantastic! I was astonished to find out I lost 5 kgs!</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={GuruvaReddy} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Dr. Guruva Reddy,&nbsp;<strong>M.D. Sunshine Hospitals</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design3">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Sridevi’s food is full of goodness
                                            and surprises. I love the way she blends flavours and textures to ensure we get all the
                                            nutrition we need. If I choose a word to describe it , yummy’ says it
                                            all.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={AmalaAkkineni} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Amala Akkineni,&nbsp;<strong>Actress &amp; Animal Welfare Activist</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design1">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">I find
                                            the morning smoothie such a great way to start the day, especially since I'm not a breakfast
                                            person. Is delivered early enough before i head for work, so I never leave home on an empty
                                            stomach like I often did earlier before meeting Sridevi. Love the banana and chia seed
                                            texture… and all the fresh berries. Staying healthy can be such a challenge but with my
                                            morning berry smoothie, i feel im starting off my day on a good note.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={SupriyaYarlagadda} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Supriya Yarlagadda,&nbsp;<strong>Annapurna Studios</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design2">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">The
                                            smoothies are my morning amrutham! Delicious and nourishing. I can’t do without
                                            them.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={NagarjunaAkkineni} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Nagarjuna Akkineni,&nbsp;<strong>Actor &amp; Business</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design3">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Morning Berry Juice, afternoon exotic
                                            Salads, Beans, seed &amp; nut Pates, amazing Dips and Of course the Sesame Crackers...
                                            Simply Superb &amp; Vibrant!!! Thank you Sridevi!!</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={GeminiKiran} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Kiran,&nbsp;<strong>M.D. Gemini Television</strong></span></p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="testimonials-item design1">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">You and your food
                                            are a gift from the universe, Sridevi Jasti. Love you so much.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Kim<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design2">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Oh yeah. I just
                                            love broccoli. Take my 5* rating. And since the new items got introduced, I am loving it
                                            more</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Kalyan Anand<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design3">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Thank you guys for
                                            your yummy treats . Vibrant foods are totally vibrant. I am a fan</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={MajulaSwaroop} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Manjula Narsa<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="testimonials-item design1">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">I am enjoying the
                                            detox... Better sleep, improved digestion, feeling lighter..</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Sanjay Dharba<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design2">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Thanks for doing
                                            your work. This city is so blessed to have you! I haven’t had the ability to really support
                                            you but I always think about what you’re doing and I love it 👍 I tell people about you
                                            whenever I can.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Jacqui<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design3">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">&nbsp;"Thinatam ravali" <br />
                                            Yes!! I have learned how to eat, what to eat...never thought eating veggies is sooo easy...<br />
                                            Thanks a ton...<br />God Bless you with all the happiness on this earth...</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Lavanya Chetan<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="testimonials-item design1">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">I know U apply magic on people. It's
                                            true Whenever u tell someone abt U I say this U should listen from her abt food U will never
                                            eat wrong food If u eat also U will be aware what u r supposed to Or not supposed
                                            to.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={BhragaviKunam} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Bhargavi Kunam,<strong>Fashion Designer</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design2">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">All my life I have been eating and
                                            tasty food, separately. Only after I met Sridevi, I realize I can have taste and health all
                                            in one meal. Sridevi introduced me to fine eating and taught me how to celebrate food. Thank
                                            you for Vibrant foods. You are simply the best! I love you.</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={MajulaSwaroop} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Manjula Gattamaneni,&nbsp;<strong>Producer</strong></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="testimonials-item design3">
                                        <h4 className="testimonials-title">Love the taste, I <br />  am her top fan!</h4>
                                        <p className="testimonials-despinfo">Thank you Sridevi
                                            for an awesome workshop. Again very excited to start building on what you shared with us
                                            yesterday. Your zeal for good wholesome food is infectious and am so glad to transfer it to
                                            my family and myself :)</p>
                                        <div className="d-flex align-items-center tm-avatar-block">
                                            <img src={avatarThubnile} alt="" className="avatar-img" />
                                            <p className="testimonials-customerinfo"><span>Shruti<strong></strong></span></p>
                                        </div>
                                    </div>
                                </div>

                            </OwlCarousel>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
}
export default Testimonials;