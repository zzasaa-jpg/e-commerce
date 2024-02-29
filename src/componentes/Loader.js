import { RotatingLines } from 'react-loader-spinner';
function loader() {
    return (
        <div className='flex justify-center pt-16 lg:p-10 '>
            <RotatingLines
                visible={true}
                height="56"
                width="56"
                color="grey"
                strokeColor="#BFC1F8"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}
export default loader