import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { Rating } from '@mui/material';

export default function RatingIcon({ value, className }) {
    return (
        <Rating
            name="half-rating-read"
            defaultValue={value}
            precision={0.5}
            readOnly
            icon={<StarRoundedIcon className={className} />}
            emptyIcon={<StarBorderRoundedIcon className={className} />}
        />
    );
};