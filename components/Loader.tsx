import Image from 'next/image';

const Loader = () => {
  return (
    <div>
      <Image
        src='/assets/images/loader.svg'
        alt='loader'
        width={32}
        height={32}
        className='animate-spin'
      />
    </div>
  );
}

export default Loader;
