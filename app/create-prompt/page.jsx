'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // the response needs to come from the server's api: include the method and the body for all the data
      // This will take all of the data from the form, on the front-end and send it to the server
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;

// 'use client';
// // checked
// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// import Form from 'components/Form';

// const CreatePrompt = () => {
//   const router = useRouter();
//   // getting the data and renaming it to session
//   const { data: session } = useSession();
//   // const session = useSession();

//   const [submitting, setSubmitting] = useState(false); // for loader, checking if submitting...
//   const [post, setPost] = useState({
//     prompt: '',
//     tag: '',
//   });

//   const createPromptFromUser = async (event) => {
//     event.preventDefault();
//     setSubmitting(true);
//     // create prompt:
//     try {
//       // the response needs to come from the server's api: include the method and the body for all the data
//       // This will take all of the data from the form, on the front-end and send it to the server
//       const response = await fetch('/api/prompt/new', {
//         method: 'POST',
//         body: JSON.stringify({
//           prompt: post.prompt,
//           userId: session?.user.id,
//           tag: post.tag,
//         }),
//       });

//       // if the response is successful, redirect to the home page
//       if (response.ok) {
//         router.push('/');
//       }
//     } catch (error) {
//       alert('Error creating prompt');
//       console.log(error);
//     } finally {
//       // finally: occurs regardless
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Form
//       type="Create"
//       post={post}
//       setPost={setPost}
//       submitting={submitting}
//       handleSubmit={createPromptFromUser}
//     />
//   );
// };

// export default CreatePrompt;
