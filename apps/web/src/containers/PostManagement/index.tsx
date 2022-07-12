import { Button, Flex, Text, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { PlusSquare } from 'react-feather'
import { Column } from 'react-table'
import * as Yup from 'yup'
import { ModalWrap, Table } from '../../components'
import CardFooter from '../../components/Card/CardFooter'
import { ConnectedCheckbox, ConnectedFormGroup } from '../../components/FormElements'
import { ERROR_TOAST, SUCCESS_TOAST } from '../../constants/index'
import { Post, PostsDocument, useCreatePostMutation, usePostsQuery } from '../../generated/graphql'
import { PageWrap } from '../../layouts'
import { formatError } from '../../utils'

type UserManagementProps = {}

type InitialValues = {
  content?: string
  title: string
  published: boolean
}

const INITIAL_VALUES: InitialValues = {
  content: '',
  title: '',
  published: false
}

const AddUserFormValidation = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  content: Yup.string()
})

const UserManagement: React.FC<UserManagementProps> = () => {
  const [modal, setModal] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const { loading: postsLoading } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setPosts(data.posts as Post[])
    }
  })

  const toast = useToast()

  const [createPost, { loading }] = useCreatePostMutation({
    onCompleted: () => {
      toast({ description: 'Post created.', ...SUCCESS_TOAST })
      setModal(false)
    },
    onError: () => {
      toast({ description: 'There was an error creating post.', ...ERROR_TOAST })
    },
    refetchQueries: [{ query: PostsDocument }]
  })

  const columns: Column[] = [
    { Header: 'title', accessor: 'title' },
    { Header: 'content', accessor: 'content' }
  ]

  const tableActions = () => {
    return (
      <Flex ml={4}>
        <Button
          colorScheme="brand"
          onClick={() => setModal(true)}
          leftIcon={<PlusSquare size="20px" />}
        >
          Add Post
        </Button>
      </Flex>
    )
  }

  return (
    <PageWrap title="Post Management" p={4} flexDir="column">
      <ModalWrap
        title="Create Post"
        isOpen={modal}
        onClose={() => {
          setModal(false)
        }}
      >
        <Formik
          validationSchema={AddUserFormValidation}
          initialValues={INITIAL_VALUES}
          onSubmit={async (input, { setStatus }) => {
            setStatus(null)
            try {
              await createPost({ variables: { input } })
            } catch (error) {
              setStatus(formatError(error as Record<string, unknown>))
            }
          }}
        >
          {({ status, handleSubmit }: FormikProps<InitialValues>) => {
            return (
              <Form style={{ width: '100%' }}>
                <Flex flexDir="column" p={4}>
                  <ConnectedFormGroup name="title" label="Title" placeholder="Title" />
                  <ConnectedFormGroup name="content" label="Content" placeholder="Content" />
                  <ConnectedCheckbox name="published" label="Published" />
                </Flex>
                {status && (
                  <Text textAlign="right" color="red.500">
                    {status}
                  </Text>
                )}
                <CardFooter alignItems="flex-end">
                  <Flex>
                    <Button
                      mr={4}
                      variant="ghost"
                      colorScheme="gray"
                      onClick={() => setModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      colorScheme="brand"
                      isLoading={loading}
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </Button>
                  </Flex>
                </CardFooter>
              </Form>
            )
          }}
        </Formik>
      </ModalWrap>
      <Table
        columns={columns}
        isLoading={postsLoading}
        tableHeading="All Posts"
        tableActions={tableActions}
        onClickNext={() => Promise.resolve(console.log('next'))}
        data={posts}
      />
    </PageWrap>
  )
}

export default UserManagement
