FROM python:3.11.3

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /ecommerce

# Install dependencies
COPY requirements.txt /ecommerce/
RUN pip install -r requirements.txt

# Copy the Django project code into the container
COPY . /ecommerce/


# Command to run the application
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]