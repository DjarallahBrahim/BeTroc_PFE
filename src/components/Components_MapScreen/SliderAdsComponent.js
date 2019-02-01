import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {itemWidth, sliderWidth} from "./styles/SliderEntry";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index';
import { ENTRIES1 } from './static/entries';

const SLIDER_1_FIRST_ITEM = 0;

export default class SliderAdsComponent extends React.Component {
    static navigationOptions = {
        title: 'SliderAdsComponent',
    };


    state={
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        slider1Ref: null,
    };


    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={false}
                parallaxProps={parallaxProps}
            />
        );
    }

    get showSliderOfAds() {
        const { slider1ActiveSlide, slider1Ref } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    ref={c => {
                        if (!this.state.slider1Ref) {
                            this.setState({ slider1Ref: c });
                        }
                    }}
                    data={this.props.exchangeMarker ? this.props.exchangeMarkerList: this.props.donationMarkerList}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={false}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    enableMomentum={false}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    // loop={true}
                    // loopClonesPerSide={2}
                    // autoplay={true}
                    // autoplayDelay={500}
                    // autoplayInterval={3000}
                    onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={slider1Ref}
                    tappableDots={!!slider1Ref}
                />
            </View>
        );
    }
    render() {
        return (
            this.showSliderOfAds
        );
    }
}

