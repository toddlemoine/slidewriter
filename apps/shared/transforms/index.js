import youtube from './youtube';
import emoji from './emoji';
import image from './image';
import chart from './chart';
import cats from './cats';

const transforms = [image, youtube, emoji, chart, cats];

export function configureTransforms(config) {
    return transforms.map(transform => transform(config));
}
