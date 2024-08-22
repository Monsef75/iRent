<template>
    
    <main>
        <!-- Header Start -->
        <div class="container-fluid header p-0" style="margin-top: 55px;" >
            <div class="row g-0 align-items-center flex-column-reverse flex-md-row">

                <div class="col-md-6 p-5 mt-lg-5">
                    <h1 class="display-5 animated fadeIn mb-4 fw-bold letter-n-1">
                        Find A <span class="c-accent fw-bold letter-p-1 fw-bolder">Perfect Home</span> To Live With Your Family
                    </h1>
                    <p class="animated fadeIn mb-5 pb-2 fst-italic s20 fst-italic">
                        Discover the ideal place to call home where your family can live in comfort and style, creating lasting memories together.
                    </p>
                    <router-link to="/Membership/Sign-Up" class="Bttn ActiveBttn fw-bold s20 py-3 px-5 me-3 animated fadeIn">
                        Get Started
                    </router-link>
                </div>

                <div class="col-md-6 BlackBackground animated fadeIn">
                    <img class="img-fluid " src="/src/assets/Imgs/CustomerUI/Home/carousel-1.jpg" alt="">
                </div>

            </div>
        </div>
        <!-- Header End -->


        <!-- Search Start -->
        <div class="container-fluid bc-accent mb-5 wow fadeIn" data-wow-delay="0.1s" style="padding: 35px;">
            <div class="container">
                <div class="row g-2">
                    <div class="col-md-10">
                        <div class="row g-2">
                            <div class="col-md-4">
                                <input type="text" class="form-control border-0 py-3" placeholder="Search Keyword">
                            </div>
                            <div class="col-md-4">
                                <select class="form-select border-0 py-3">
                                    <option selected>Property Type</option>
                                    <option value="1">Property Type 1</option>
                                    <option value="2">Property Type 2</option>
                                    <option value="3">Property Type 3</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <select class="form-select border-0 py-3">
                                    <option selected>Location</option>
                                    <option value="1">Location 1</option>
                                    <option value="2">Location 2</option>
                                    <option value="3">Location 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button class="Bttn ActiveBttn border-0 w-100 py-3">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Search End -->


        <!-- Category Start -->
        <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3 s50 fw-bold letter-n-1">Property Types</h1>
                    <p class="c-light-grey" >Explore a variety of property types, from cozy homes to luxurious estates, catering to every lifestyle.</p>
                </div>
                <div class="row g-4">
                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s" v-for="Type in PropertyTypes" >
                        <div class="cat-item d-block text-center rounded p-3">
                            <div class="rounded p-4 bc-Light-grey3">
                                <div class="icon mb-3">
                                    <img class="img-fluid" :src="Type.Img" alt="Icon">
                                </div>
                                <h6 class="c-text fw- s20 mb-2"  >{{ Type.Name }}</h6>
                                <span class="c-grey w-400 s15"  >{{ Type.Value }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Category End -->


        <!-- About Start -->
        <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div class="about-img position-relative overflow-hidden p-5 pe-0">
                            <img class="img-fluid w-100" src="/src/assets/Imgs/CustomerUI/Home/about.jpg">
                        </div>
                    </div>
                    <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 class="mb-4 s50 c-text fw-bold letter-n-1">#1 Place To Find The Perfect Property</h1>
                        <p class="mb-4 c-grey s18">Discover the ideal place to find the perfect property. Whether you're seeking a cozy home or a luxurious estate, we have options to suit every need.</p>
                        <p class="c-grey s17 fw-bold mb-3" ><i class="fa fa-check s20 me-3"></i>Modern Amenities</p>
                        <p class="c-grey s17 fw-bold mb-3" ><i class="fa fa-check s20 me-3"></i>Spacious Layouts</p>
                        <p class="c-grey s17 fw-bold mb-5" ><i class="fa fa-check s20 me-3"></i>Prime Locations</p>
                        <a class="Bttn ActiveBttn py-3 px-5" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- About End -->


        <!-- Property List Start -->
        <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-0 gx-5 align-items-end">
                    <div class="col-lg-6">
                        <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                            <h1 class="mb-3 s50 fw-bold letter-n-1">Property Listing</h1>
                            <p class="c-light-grey s20" >Browse our comprehensive property listing to find your ideal home with detailed descriptions and features.</p>
                        </div>
                    </div>
                    <div class="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                        <ul class="nav nav-pills d-inline-flex justify-content-end mb-5">
                            <li class="nav-item me-2">
                                <a class="btn btn-outline-primary active" data-bs-toggle="pill" href="#tab-1">Featured</a>
                            </li>
                            <li class="nav-item me-2">
                                <a class="btn btn-outline-primary" data-bs-toggle="pill" href="#tab-2">For Sell</a>
                            </li>
                            <li class="nav-item me-0">
                                <a class="btn btn-outline-primary" data-bs-toggle="pill" href="#tab-3">For Rent</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-5">
                            <Properties :Properties="Properties" data-wow-delay="0.1s" />
                            <div class="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                <router-link to="/Explore" class="Bttn ActiveBttn py-3 px-5">Browse More Property</router-link>
                            </div>
                        </div>
                    </div>
                    <div id="tab-2" class="tab-pane fade show p-0">
                        <div class="row g-5">
                            <Properties :Properties="Properties" data-wow-delay="0.1s" />
                            <div class="col-12 text-center">
                                <router-link to="/Explore" class="btn btn-primary py-3 px-5">Browse More Property</router-link>
                            </div>
                        </div>
                    </div>
                    <div id="tab-3" class="tab-pane fade show p-0">
                        <div class="row g-5">
                            <Properties :Properties="Properties" data-wow-delay="0.1s" />
                            <div class="col-12 text-center">
                                <router-link to="/Explore" class="btn btn-primary py-3 px-5">Browse More Property</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Property List End -->


        <!-- Call to Action Start -->
        <div class="container-xxl py-5">
            <div class="container">
                <div class="bg-light rounded p-3">
                    <div class="bg-white rounded p-4" style="border: 1px dashed rgba(0, 185, 142, .3)">
                        <div class="row g-5 align-items-center">
                            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                <img class="img-fluid rounded w-100" src="/src/assets/Imgs/CustomerUI/Home/call-to-action.jpg" alt="">
                            </div>
                            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                <div class="mb-4">
                                    <h1 class="mb-3 s50 fw-bold letter-n-1">Contact With Our Certified Agent</h1>
                                    <p class="c-light-grey" >Reach out to our certified agent for personalized assistance and expert advice. We'll help you find the perfect property tailored to your needs.</p>
                                </div>
                                <button class="Bttn ActiveBttn py-3 px-4 me-2"><i class="fa fa-phone-alt me-2"></i>Make A Call</button>
                                <button class="Bttn bc-grey c-white py-3 px-4"><i class="fa fa-calendar-alt me-2"></i>Get Appoinment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Call to Action End -->
        

        <!-- Footer Start -->
        <div class="container-fluid bc-accent text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
            <div class="container py-5">
                <div class="row g-5">
                    <div class="col-lg-3 col-md-6">
                        <h5 class="text-white mb-4">Get In Touch</h5>
                        <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>123 Street, Oum El Bouaghi</p>
                        <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
                        <div class="d-flex pt-2">
                            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-youtube"></i></a>
                            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <h5 class="text-white mb-4">Quick Links</h5>
                        <router-link to="/" class="btn btn-link text-white-50"> Home </router-link>
                        <router-link to="/Explore" class="btn btn-link text-white-50"> Explore </router-link>
                        <router-link to="/List" class="btn btn-link text-white-50"> List Your Property </router-link>
                        <router-link to="/Profile" class="btn btn-link text-white-50"> Profile </router-link>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <h5 class="text-white mb-4">Photo Gallery</h5>
                        <div class="row g-2 pt-2">
                            <div class="col-4">
                                <img class="img-fluid rounded bg-light p-1" src="/src/assets/Imgs/CustomerUI/Home/property-1.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img class="img-fluid rounded bg-light p-1" src="/src/assets/Imgs/CustomerUI/Home/property-2.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img class="img-fluid rounded bg-light p-1" src="/src/assets/Imgs/CustomerUI/Home/property-3.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img class="img-fluid rounded bg-light p-1" src="/src/assets/Imgs/CustomerUI/Home/property-4.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img class="img-fluid rounded bg-light p-1" src="/src/assets/Imgs/CustomerUI/Home/property-5.jpg" alt="">
                            </div>
                            <div class="col-4">
                                <img class="img-fluid rounded bg-light p-1" src="/src/assets/Imgs/CustomerUI/Home/property-6.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <h5 class="text-white mb-4">Newsletter</h5>
                        <p>Subscribe to our newsletter for the latest property updates.</p>
                        <div class="position-relative mx-auto mt-4" style="max-width: 400px;">
                            <input class="bg-transparent c-white bd-white w-100 py-3 ps-4 pe-5 rd-5" type="text" value="Your email">
                            <button type="button" class="Bttn ActiveBttn py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container t-center py-3 bd-t-white">
                &copy; <span class="c-primary fw-bold" >Rent</span> , All Right Reserved. Designed By <span class="c-primary fw-bold text-decoration-underline" >Rent Team</span>
            </div>
        </div>
        <!-- Footer End -->
    </main>

</template>

<script>
        
    import Properties from '@/components/CustomerUI/Properties/Properties.vue'
    import { mapActions } from 'vuex'

    export default {
    
        components: {Properties,},
        data() { return {
            PropertyTypes: [
                { Name: 'Apartment', Img: '/src/assets/Imgs/CustomerUI/Home/icon-apartment.png', Value: '123 Properties',},
                { Name: 'Villa',     Img: '/src/assets/Imgs/CustomerUI/Home/icon-villa.png', Value: '123 Properties',},
                { Name: 'Home',      Img: '/src/assets/Imgs/CustomerUI/Home/icon-house.png', Value: '123 Properties',},
                { Name: 'Office',    Img: '/src/assets/Imgs/CustomerUI/Home/icon-housing.png', Value: '123 Properties',},
                { Name: 'Building',  Img: '/src/assets/Imgs/CustomerUI/Home/icon-building.png', Value: '123 Properties',},
                { Name: 'Townhouse', Img: '/src/assets/Imgs/CustomerUI/Home/icon-neighborhood.png', Value: '123 Properties',},
                { Name: 'Shop',      Img: '/src/assets/Imgs/CustomerUI/Home/icon-condominium.png', Value: '123 Properties',},
                { Name: 'Garage',    Img: '/src/assets/Imgs/CustomerUI/Home/icon-luxury.png', Value: '123 Properties',},
            ],
            Properties: [],
        }},
        methods: {
            ...mapActions(['SetProperties']),
        },
        created() {
            this.SetProperties().then( res => {
                this.Properties = res
            })
        },
    }
    
</script>

<style scoped lang='scss'>

main {
    background-color: var(--Background);
}
    
/*** Header ***/

@media (min-width: 992px) {
    .header {
        margin-top: -120px;
    }
}

.header-carousel .owl-nav {
    position: absolute;
    top: 50%;
    left: -25px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    .owl-prev,
    .owl-next {
        margin: 7px 0;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        background: var(--primary);
        border-radius: 40px;
        font-size: 20px;
        transition: .5s;
    }
    .owl-prev:hover,
    .owl-next:hover {
        background: var(--dark);
    }
}

@media (max-width: 768px) {
    .header-carousel .owl-nav {
        left: 25px;
    }
}

.breadcrumb-item + .breadcrumb-item::before {
    color: #DDDDDD;
}


/*** Icon ***/

.icon {
    padding: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF !important;
    border-radius: 50px;
    border: 1px dashed var(--primary) !important;
}


/*** About ***/
.about-img img {
    position: relative;
    z-index: 2;
}

.about-img::before {
    position: absolute;
    content: "";
    top: 0;
    left: -50%;
    width: 100%;
    height: 100%;
    background: var(--Accent);
    transform: skew(20deg);
    z-index: 1;
}


/*** Category ***/

.cat-item {
    div {
        border: 1px dashed rgba(0, 185, 142, .3);
        transition: .5s;
    }
    div * {
        transition: .5s;
    }
}

.cat-item:hover {
    div {
        background: var(--Accent);
        border-color: transparent;
    }
    div * {
        color: #FFFFFF !important;
    }
}

/*** Property List ***/

.nav-pills .nav-item {
    .btn {
        color: var(--Text);
        transition: var(--Trans3);
    }
    .btn:hover,
    .btn.active {
        background-color: var(--Primary);
    }
}

/*** Testimonial ***/

.testimonial-carousel {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .testimonial-item .border {
        border: 1px dashed rgba(0, 185, 142, .3) !important;
    }
    .owl-nav {
        position: absolute;
        width: 100%;
        height: 40px;
        top: calc(50% - 20px);
        left: 0;
        display: flex;
        justify-content: space-between;
        z-index: 1;
    }
    .owl-nav .owl-prev,
    .owl-nav .owl-next {
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        background: var(--primary);
        border-radius: 40px;
        font-size: 20px;
        transition: .5s;
    }
    .owl-nav .owl-prev:hover,
    .owl-nav .owl-next:hover {
        background: var(--dark);
    }
}

@media (min-width: 576px) {
    .testimonial-carousel {
        padding-left: 4rem;
        padding-right: 4rem;
    }
}


/*** Footer ***/

.footer {
    .btn.btn-social {
        margin-right: 5px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--light);
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: 35px;
        transition: .3s;
    }
    .btn.btn-social:hover {
        color: var(--Primary);
        border-color: var(--Primary);
        background-color: var(--Accent);
    }
    .btn.btn-link {
        display: block;
        margin-bottom: 5px;
        padding: 0;
        text-align: left;
        font-size: 15px;
        font-weight: normal;
        text-transform: capitalize;
        transition: .3s;
    }
    .btn.btn-link::before {
        position: relative;
        content: "\f105";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        margin-right: 10px;
    }
    .btn.btn-link:hover {
        letter-spacing: 1px;
        box-shadow: none;
    }
    .form-control {
        border-color: rgba(255,255,255,0.5);
        // color: white;
    }
    .footer-menu {
        a {
            margin-right: 15px;
            padding-right: 15px;
            border-right: 1px solid rgba(255, 255, 255, .1);
        }
        a:last-child {
            margin-right: 0;
            padding-right: 0;
            border-right: none;
        }
    }
}

</style>